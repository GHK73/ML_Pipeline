# DeepShield AI — Scalable AI Inference Platform for Deepfake Detection

DeepShield AI is a scalable AI inference and model hosting platform designed for serving deepfake detection models efficiently in production-style environments.

The platform supports:
- CNN-based deepfake detection models
- SVM-based detection pipelines
- Future transformer-based architectures
- Dynamic model loading
- Redis-based prediction caching
- SHA-256 image deduplication
- Lazy-loaded runtime management
- Secure model lifecycle management

Unlike traditional notebook-based ML projects, this project focuses heavily on:
- ML Systems Engineering
- AI Infrastructure
- Backend Scalability
- Runtime Optimization
- Model Serving Architecture

---

# Features

## AI Inference Features

- Upload trained CNN/SVM models
- Dynamic runtime model loading
- Support for multiple architectures
- Lazy-loaded model management
- Image preprocessing pipelines
- Prediction confidence scoring
- Future transformer runtime support

---

## Backend Engineering Features

- Redis-based prediction caching
- SHA-256 image deduplication
- Rate limiting
- Dynamic model registry
- Queue-based processing
- PostgreSQL metadata management
- Runtime benchmarking support

---

## Optimization Features

- Cache hit tracking
- Throughput benchmarking
- Memory optimization
- Inference latency measurement
- Duplicate upload prevention
- Lazy-loading optimization

---

# System Architecture

```text
                    React Frontend
                           │
                           ▼
                  Node.js API Gateway
                           │
 ┌─────────────────────────┼─────────────────────────┐
 │                         │                         │
 ▼                         ▼                         ▼
PostgreSQL             Redis Cache             File Storage
 │                         │                    (S3/local)
 │                         │
 │                ┌────────┼────────┐
 │                │                 │
 │                ▼                 ▼
 │          Rate Limiter      Prediction Cache
 │                                  │
 │                           Image Hash Cache
 │
 └─────────────────────────┬─────────────────────────┘
                           ▼
                    Python ML Service
                           │
       ┌───────────────────┼───────────────────┐
       │                   │                   │
       ▼                   ▼                   ▼
 Model Registry      Runtime Loader      Validation Engine
       │
       ▼
 ┌───────────────┬───────────────┐
 ▼                               ▼
CNN Runtime                  SVM Runtime
(PyTorch)                    (sklearn)
```

---

# Tech Stack

## Frontend

- React
- TailwindCSS
- Axios
- React Router

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- Multer
- BullMQ

---

## Database & Caching

- PostgreSQL
- Prisma ORM
- Redis

---

## ML Runtime

- FastAPI
- PyTorch
- scikit-learn
- OpenCV
- Pillow

---

## Storage

- AWS S3

---

## DevOps

- Docker
- NGINX

---

# Folder Structure

```text
project-root/
│
├── frontend/
│
├── backend/
│
├── ml-service/
│
├── docker/
│
├── uploads/
│
└── README.md
```

---

# Frontend Structure

```text
frontend/src/
│
├── components/
├── pages/
├── services/
├── hooks/
├── context/
└── utils/
```

---

# Backend Structure

```text
backend/
│
├── controllers/
├── routes/
├── middleware/
├── services/
├── queues/
├── prisma/
├── utils/
└── uploads/
```

---

# ML Service Structure

```text
ml-service/
│
├── app/
│   ├── api/
│   ├── registry/
│   ├── inference/
│   ├── preprocessing/
│   ├── validators/
│   └── runtimes/
│
├── models/
└── requirements.txt
```

---

# Supported Models

## CNN Models

- ResNet18
- ResNet50
- EfficientNet
- MobileNet
- Future Vision Transformers

---

## SVM Pipelines

- HOG + SVM
- LBP + SVM
- FFT + SVM

---

# Model Upload Format

## CNN Upload

```text
model.zip
│
├── weights.pt
├── config.json
└── preprocess.json
```

---

## Example config.json

```json
{
  "framework": "pytorch",
  "architecture": "resnet50",
  "input_size": 224,
  "num_classes": 2
}
```

---

## Example preprocess.json

```json
{
  "resize": [224, 224],
  "normalize": true
}
```

---

# Redis Caching Strategy

## Prediction Cache Key

```text
pred:modelId:imageHash
```

Example:

```text
pred:efficientnet:ab39f0d8e3
```

---

# Deduplication Strategy

The system generates SHA-256 hashes for uploaded images.

If:
- same image
- same model

then:
- inference is skipped
- cached prediction returned instantly

---

# Feature Flags

The project uses feature flags for benchmarking and optimization testing.

## Example

```env
CACHE_ENABLED=true
LAZY_LOADING=true
DEDUP_ENABLED=true
RATE_LIMITING=true
```

---

# Metrics Tracked

## ML Metrics

- Accuracy
- Precision
- Recall
- F1-score
- ROC-AUC

---

## System Metrics

- Cache hit rate
- Average inference latency
- Throughput
- Duplicate uploads prevented
- Memory usage
- Startup time

---

# Benchmarking

## Cache Hit Rate

```text
cache_hits / total_requests
```

---

## Latency Improvement

```text
(old_latency - new_latency) / old_latency × 100
```

---

# Example Improvements

| Metric | Baseline | Optimized |
|---|---|---|
| Avg latency | 1800ms | 120ms |
| Throughput | 8 req/s | 24 req/s |
| RAM usage | 8GB | 2GB |
| Cache hit rate | 0% | 42% |

---

# Installation

## Clone Repository

```bash
git clone <repo-url>
cd project-root
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# ML Service Setup

```bash
cd ml-service
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

# Docker Setup

```bash
docker-compose up --build
```

---

# Future Improvements

- Vision Transformer support
- ONNX runtime optimization
- TensorRT acceleration
- Multi-GPU inference
- Batch inference
- Kubernetes deployment
- Monitoring dashboards
- Prometheus + Grafana integration

---

# Placement-Oriented Highlights

This project demonstrates:
- AI Infrastructure Engineering
- ML Systems Design
- Backend Scalability
- Runtime Optimization
- Distributed Caching
- Dynamic Model Serving
- Performance Benchmarking

---

# Author

Gunuru Hemanth Kumar

Integrated M.Tech — Mathematics & Computing  
IIT (ISM) Dhanbad
