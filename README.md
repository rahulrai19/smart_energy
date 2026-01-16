# Smart Energy Consumption Analysis and Prediction

A comprehensive full-stack application for monitoring, analyzing, and predicting energy consumption using machine learning and Generative AI. This system provides a modern dashboard for real-time visualization, an AI-powered assistant with voice capabilities, and batch processing for bulk energy data analysis.

**[View on GitHub](https://github.com/springboardmentor2001-sudo/Smart-Energy-Consumption-Analysis-and-Prediction/tree/Rahul-Rai)**

---

## 📸 Screenshots

| Dashboard Overview | Energy Analysis |
|:---:|:---:|
| ![Dashboard Mockup](Medias/screenshot1.png) | ![Analysis Mockup](Medias/screenshot2.png) |
| *Real-time Energy Monitoring* | *Detailed Consumption Analysis* |

| AI Assistant | Voice Interaction |
|:---:|:---:|
| ![AI Chat](Medias/screenshot3.png) | ![Voice Features](Medias/screenshot4.png) |
| *Smart Assistant with Gemini* | *Voice Command & TTS* |

| Batch Prediction | Settings & Config |
|:---:|:---:|
| ![Batch Mode](Medias/screenshot5.png) | ![Settings UI](Medias/screenshot6.png) |
| *Bulk CSV/PDF Processing* | *User Preferences* |

---

## ✨ Key Features

### 📊 Interactive Dashboard
- **Real-time Visualization**: Dynamic charts showing energy usage trends over time.
- **Device Breakdown**: Categorized usage stats (HVAC, Lighting, etc.) with efficiency scores.
- **Cost Estimation**: Live calculation of daily and monthly projected costs.

### 🤖 AI-Powered Assistant
- **Gemini Integration**: Context-aware chat for energy queries and savings tips.
- **Voice-Enabled**:
    - **Speech-to-Text (STT)**: Ask questions using your microphone.
    - **Text-to-Speech (TTS)**: Listen to the assistant's responses.
- **Smart Prediction**: Ask natural language questions like *"Predict energy for 25C temp and 2 people"* to trigger ML models.

### 📝 Batch Data Processing
- **Bulk Analysis**: Upload CSV or PDF files containing historical data.
- **Automated forecasting**: Get energy predictions for thousands of records instantly.
- **PDF Extraction**: Intelligent parsing of energy data tables from PDF reports using Gemini.

### ⚙️ Smart Settings
- **Customizable Profile**: Set your budget, energy rates, and household parameters.
- **Theme Support**: Toggle between Light and Dark modes.

---

## 🛠️ Technology Stack

### Frontend
- **React**: Component-based UI architecture.
- **Vite**: Next-generation frontend tooling.
- **Tailwind CSS**: Utility-first styling for modern, responsive designs.
- **Lucide React**: Beautiful & consistent iconography.
- **Recharts**: Composable charting library.

### Backend
- **Flask**: Lightweight Python web server.
- **Google Generative AI (Gemini)**: For natural language processing and data extraction.
- **Pandas & NumPy**: Data manipulation and analysis.
- **Machine Learning**: LightGBM/XGBoost models for accurate energy forecasting.

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- Google Gemini API Key

### 1. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd Backend
pip install -r requirements.txt
```
Create a `.env` file in the `Backend` folder:
```env
GEMINI_API_KEY=your_api_key_here
```
Run the server:
```bash
python app.py
```

### 2. Frontend Setup
Navigate to the UI directory and install dependencies:
```bash
cd UI
npm install
```
Run the development server:
```bash
npm run dev
```

### 3. Usage
- Open your browser at `http://localhost:5173`.
- Navigate to **"Assistant"** to try the Voice Chat.
- Go to **"Batch Prediction"** to upload a CSV/PDF for analysis.

---

## 🚀 Deployment on Vercel

### Backend Deployment

The backend is configured for Vercel deployment. Large model and dataset files are excluded from deployment to stay within Vercel's 250 MB serverless function limit.

#### Option 1: Deploy without Model (Limited Functionality)
The app will work but prediction endpoints will return errors. This is fine for testing or if you don't need ML predictions.

#### Option 2: Deploy with Model via External Storage (Recommended)
1. **Upload your model to external storage** (e.g., AWS S3, Google Cloud Storage, or any public URL):
   - Upload `Models/lgb_model_clean.pkl` to your storage service
   - Make it publicly accessible or use signed URLs

2. **Set Environment Variable in Vercel**:
   - Go to your Vercel project settings
   - Add environment variable: `MODEL_URL` with the public URL to your model file
   - Example: `MODEL_URL=https://your-bucket.s3.amazonaws.com/lgb_model_clean.pkl`

3. **Deploy**:
   - The app will automatically download the model at startup if `MODEL_URL` is set
   - Model is cached in memory after first load

#### Important Notes:
- The `.vercelignore` file excludes `.pkl` and `.csv` files from deployment
- Dataset files are optional - the app works with empty datasets
- Make sure your `GEMINI_API_KEY` is set in Vercel environment variables

---

## 📄 License
This project is licensed under the MIT License.
