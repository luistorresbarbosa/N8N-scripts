# Ansible AI Sandbox

This folder scaffolds an Ansible setup to provision a test server with Docker,
Dockge, and a Llama 3.2 stack (Ollama + Open WebUI + LLM sandbox UI).

## What's included
- Inventory for a sandbox host.
- Playbooks to bootstrap Docker + Dockge and deploy the Llama stack.
- Templates for Dockge and Llama stack compose files.

## Quick start
1. `cd ansible`
2. Update the inventory in `inventories/sandbox/hosts.yml`.
3. Adjust defaults in `inventories/sandbox/group_vars/all.yml`.
4. Run the bootstrap playbook:
   `ansible-playbook -i inventories/sandbox/hosts.yml playbooks/bootstrap.yml`
5. Deploy Llama 3.2:
   `ansible-playbook -i inventories/sandbox/hosts.yml playbooks/deploy-llama.yml`
6. Open the UIs:
   - Dockge UI: `http://<server-ip>:5001`
   - Open WebUI: `http://<server-ip>:3000`
   - LLM Sandbox UI: `http://<server-ip>:8088`

## Notes
- Rocky Linux uses the Docker CE repo; the bootstrap playbook configures it on
  RedHat-based hosts.
- The Llama model is pulled with `ollama pull` and may take time.
- Set `llama_model` or `llama_models` to control which models are installed.
- Secure the exposed ports (firewall, VPN, or reverse proxy) before use.
- To run both steps:
  `ansible-playbook -i inventories/sandbox/hosts.yml playbooks/site.yml`
