import heapq
import os
import pickle
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from sentence_transformers import util
import pymongo
from dotenv import load_dotenv
import pandas as pd
from sentence_transformers import SentenceTransformer

# Global variables for the model and loaded documents
model = None
documentos_cargados = None

load_dotenv()
# Class to handle HTTP requests
class RequestHandler(BaseHTTPRequestHandler):
    # Method to set HTTP response headers
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    # Method to handle POST requests
    def do_POST(self):
        self._set_headers()

        # Get the content length and read the data sent in the POST request
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)

        # Decode the JSON data from the request body
        post_data_json = json.loads(post_data.decode('utf-8'))

        # Extract the text string sent in the request
        phrase = post_data_json.get('phrase', '')
        print('Cadena recibida desde el cliente:', phrase)

        # Encode the reference phrase using the sentence transformer model
        frase_de_referencia = model.encode(phrase)
        most_similar_index = []
        most_similar_index.append(0)
        most_similar_index.append(0)

        # Initialize a list to store the most similar documents
        i = -1
        top_documents = []

        # Compare the similarity between the reference phrase and all loaded documents
        for documento in documentos_cargados:

            # Calculate the similarity between the phrase and each document
            i = i + 1
            similitud = util.cos_sim(frase_de_referencia,documento[1]).item()
            # Maintain a list of the most similar documents using a priority queue
            if len(top_documents) < 4:
                heapq.heappush(top_documents, (similitud, documento[0]))
            elif similitud > top_documents[0][0]:
                heapq.heappushpop(top_documents, (similitud, documento[0]))
            """"if most_similar_index[0] < similitud:
                most_similar_index[0] = similitud
                most_similar_index[1] = i"""""

        print("indice: ", most_similar_index[1])
        # Sort the found documents by similarity in descending order
        top_documents = sorted(top_documents, reverse=True)
        print(top_documents)
        # Return the most similar documents as a JSON response
        response_data = {'message': top_documents}
        self.wfile.write(json.dumps(response_data).encode('utf-8'))


# Function to load new movies from MongoDB
def newMovies():
    # Connect to the MongoDB database
    mongo_uri = os.getenv("MONGO_URI")
    if mongo_uri is None:
        raise ValueError("MONGO_URI environment variable not set!")

    client = pymongo.MongoClient(mongo_uri)
    db = client["MovieRecommender"]
    # Check if there are new documents in the NewOverview collection
    if db.NewOverview.find_one() is None:
        print("No new movies")
        return
    else:
        print("New movies")
        # Add the new documents to the previously loaded ones and save them to a file
        newOverview = db.NewOverview.find()
        nuevos_documentos_procesados = [(documento["id"], model.encode(documento["overview"])) for documento in newOverview if "overview" in documento and pd.notnull(documento["overview"])]
        documentos_cargados.extend(nuevos_documentos_procesados)
        with open("documentos_procesados.pkl", "wb") as f:
           pickle.dump(documentos_cargados, f)

        # Delete the processed documents from the collection to avoid duplicates
        db.NewOverview.delete_many({})
        return

# Function to start the HTTP server
def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()




if __name__ == "__main__":
    # Load the processed documents from a .pkl file
    with open("documentos_procesadosNewLibraryBert.pkl", "rb") as f:
        documentos_cargados = pickle.load(f)
    # Load the sentence transformer model
    model = SentenceTransformer('all-MiniLM-L6-v2')
    # Load new movies if there are new documents in the database
    newMovies()
    # Run the server on port 8000
    run()
