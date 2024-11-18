# 🎬 Artificial Intelligence Movie Recommendation Platform

This project consists of a web platform for movie recommendation using Artificial Intelligence and a dual backend system: a Python server for natural language processing (NLP) and a Next.js server to manage the frontend and API requests.

## 🚀 Features
- 📋 **Custom list management**: Watchlist, Likelist, and Unlikelist movies.
- 🤖 **Recommendation chatbot**: Uses NLP to recommend movies based on user input. Uses pre-trained models (`SentenceTransformer`) to calculate similarities.
- 📊 **AI-based recommendations (BERT)**: Uses the **BERT model** pre-trained with `SentenceTransformer` to calculate semantic similarities for NLP and recommendations.
- 🔍 **Movie search**: Allows you to search and get detailed information.
- 🔐 **User authentication**: Uses **Firebase** for secure registration and login.
- 📡 **Integration with MongoDB**: To manage movie and user information.

## 🛠️ Technologies Used
- **Backend (API Python)**: Python, `pymongo`, `http.server`.
- **Natural Language Processing**: `sentence-transformers` (BERT model).
- **Backend (Next.js API)**: Next.js, TypeScript, Node.js.
- **Frontend**: Next.js, React, Tailwind CSS.
- **Authentication and Security**: Firebase Authentication.
- **Database**: MongoDB Atlas.
- **Others**: dotenv, pandas, pickle.

---

## ⚙️ Environment Configuration

### 1. Create an `.env` file in the Python project folder with:
    
    MONGO_URI=your_mongodb_url
    
### 2. Create an .env file in the Next.js project folder with:
    
    MONGODB_URL=your_mongodb_url
    NEXT_PUBLIC_TMDB_API_TOKEN=token_API_TMDB
    REACT_APP_FIREBASE_API_KEY=firebase_key
    


---

## 🖥️ Next.js execution

1. Install dependencies:
    ```bash
    cd testNextjs
    cd ejemplo
    npm install
    ```
2. Start the Next.js server:
    ```bash
    npm run dev
    ```
   The Next.js server will run at [http://localhost:3000](http://localhost:3000).

---

## 🖥️ Python (NLP) execution

1. Start the Python server:
    ```bash
    cd NLPCode
    python server.py
    ```
   The Python server will be started at [http://localhost:8000](http://localhost:8000).

---

Ahora los saltos de línea y la estructura deberían funcionar correctamente en GitHub. Asegúrate de que el archivo tenga la extensión **`.md`** y que estés usando un editor de texto que respete la codificación **UTF-8**. Además, puedes previsualizar tu README antes de subirlo a GitHub para asegurarte de que se vea como esperas. 🚀

