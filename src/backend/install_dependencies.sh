#!/bin/bash

# Installation script to avoid dependency conflicts
# Run this script instead of pip install -r requirements.txt

echo "=========================================="
echo "Installing Dependencies in Correct Order"
echo "=========================================="

# Step 1: Upgrade pip
echo -e "\n[1/8] Upgrading pip..."
pip install --upgrade pip

# Step 2: Remove conflicting packages
echo -e "\n[2/8] Removing potentially conflicting packages..."
pip uninstall -y langchain langchain-core langchain-community langchain-text-splitters langchain-groq langchain-unstructured onnxruntime 2>/dev/null || true

# Step 3: Install core dependencies first
echo -e "\n[3/8] Installing core dependencies..."
pip install fastapi==0.115.12 uvicorn[standard]==0.34.3 python-multipart==0.0.20 python-dotenv==1.0.1

# Step 4: Install authentication packages
echo -e "\n[4/8] Installing authentication packages..."
pip install pyjwt==2.10.1 cryptography==46.0.3 python-jose[cryptography]==3.4.0

# Step 5: Install HTTP and AI clients
echo -e "\n[5/8] Installing HTTP and AI clients..."
pip install httpx==0.28.1 groq==0.15.0

# Step 6: Install LangChain ecosystem (critical order)
echo -e "\n[6/8] Installing LangChain ecosystem..."
pip install langchain-core==0.3.79
pip install langchain-text-splitters==0.3.25
pip install langchain-community==0.3.24
pip install langchain==0.3.25
pip install langchain-groq==0.2.7

# Step 7: Install document processing and unstructured
echo -e "\n[7/8] Installing document processing..."
pip install onnxruntime==1.19.2
pip install unstructured==0.16.7 unstructured-client==0.27.0
pip install langchain-unstructured==0.1.6
pip install pypdf==6.1.3 python-docx==1.1.2 python-pptx==1.0.2 pillow==11.1.0 pdf2image==1.17.0

# Step 8: Install remaining packages
echo -e "\n[8/8] Installing remaining packages..."
pip install faiss-cpu==1.9.0.1 fastembed==0.4.5
pip install numpy==1.26.4 scikit-learn==1.6.0 arxiv==2.1.3
pip install crewai==0.86.0 crewai-tools==0.15.1
pip install pydantic==2.10.7 aiofiles==25.1.0 requests==2.32.5

echo -e "\n=========================================="
echo "Installation Complete!"
echo "=========================================="

# Verify critical imports
echo -e "\nVerifying installations..."
python3 << EOF
try:
    from langchain_unstructured import UnstructuredLoader
    print("✓ langchain-unstructured: OK")
except ImportError as e:
    print("✗ langchain-unstructured: FAILED -", e)

try:
    from crewai import Agent, Task, Crew
    print("✓ crewai: OK")
except ImportError as e:
    print("✗ crewai: FAILED -", e)

try:
    from langchain_groq import ChatGroq
    print("✓ langchain-groq: OK")
except ImportError as e:
    print("✗ langchain-groq: FAILED -", e)

try:
    from groq import Groq
    print("✓ groq: OK")
except ImportError as e:
    print("✗ groq: FAILED -", e)

print("\nAll critical imports verified!")
EOF

echo -e "\nYou can now run: uvicorn main:app --reload"