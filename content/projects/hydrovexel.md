---
title: "HydroVexel — AI Oil Spill Detection"
description: "A deep learning system for satellite-based oil spill detection — 94.57% accuracy using U-Net with Attention Gates, deployed on Streamlit."
date: "2024-09-01"
tags: ["Python", "TensorFlow", "PyTorch", "U-Net", "Streamlit", "Supabase", "OpenCV"]
github: "https://github.com/simplysandeepp/INFOSYS-_INTERNSHIP-OIL_SPILL_DETECTION-"
live: "https://hydrovexel.streamlit.app"
featured: false
---

## Overview

An advanced deep learning system developed during an **Infosys Internship** for rapid, accurate detection and analysis of oil spills from satellite and aerial imagery. Deployed as an interactive Streamlit web application.

## ML Pipeline

**Data** — 1,268 labeled satellite images targeting oil spill phenomena.

**Preprocessing** — SAR speckle noise reduction and advanced augmentation to improve model generalization.

**Model** — U-Net architecture enhanced with Attention Gates and Residual Blocks for superior feature extraction and segmentation precision.

**Training** — 30 epochs, mixed precision (FP16), learning rate 0.0001.

**Results** — 94.57% accuracy with confidence mapping and precise binary segmentation masks.

## Deployment

Hosted as an interactive Streamlit application with cloud storage integration via Supabase.
