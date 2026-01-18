# VM Resource Guide (LLM Sandbox)

This guide outlines baseline VM resources for running the LLM sandbox stack
on Rocky Linux in Proxmox (Docker + Dockge + Ollama + Open WebUI + LLM Sandbox UI).

## Resource profiles

### Minimum (basic UI + small model)
- vCPU: 2
- RAM: 8 GB
- Disk: 60 GB (SSD/NVMe preferred)
- Use case: single small model (1B to 3B), light testing

### Recommended (daily testing)
- vCPU: 4
- RAM: 16 GB
- Disk: 100 GB (SSD/NVMe)
- Use case: multiple small models or one mid-size model (7B to 8B)

### Performance (multi-model or heavy usage)
- vCPU: 8+
- RAM: 32 GB+
- Disk: 200 GB+ (SSD/NVMe)
- Use case: concurrent users, multiple models, larger model sizes

## Storage sizing notes
- Base OS + Docker + Dockge: ~20 GB
- Logs + UI assets: ~5 GB
- Ollama models: varies by model size (plan 10 to 20 GB per small model and
  30+ GB for larger models)
- Keep at least 20% free space for model downloads and updates

## Optional GPU acceleration
- If you plan to use GPU models, pass through a supported NVIDIA GPU to the VM.
- Allocate enough VRAM for the target model sizes.
- Install the NVIDIA driver on the host VM and ensure Docker has access to it.

## Proxmox tuning tips
- Use VirtIO for disk and network devices.
- Set CPU type to "host" for best performance.
- Enable the QEMU guest agent in the VM.

## Network ports (inbound)
- Dockge UI: 5001
- Open WebUI: 3000
- LLM Sandbox UI: 8088
- Ollama API (optional): 11434
