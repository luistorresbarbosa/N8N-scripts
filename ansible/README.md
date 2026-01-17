# Ansible AI Sandbox

This folder scaffolds an Ansible setup to provision a test server with Docker,
Dockge, and a Llama 3.2 stack (Ollama + Open WebUI).

## What's included
- Inventory for a sandbox host.
- Playbooks to bootstrap Docker + Dockge and deploy the Llama stack.
- Templates for Dockge and Llama stack compose files.

## Quick start
1. Update the inventory in `inventories/sandbox/hosts.yml`.
2. Adjust defaults in `inventories/sandbox/group_vars/all.yml`.
3. Run the bootstrap playbook:
   `ansible-playbook -i inventories/sandbox/hosts.yml playbooks/bootstrap.yml`
4. Deploy Llama 3.2:
   `ansible-playbook -i inventories/sandbox/hosts.yml playbooks/deploy-llama.yml`
5. Open the UIs:
   - Dockge UI: `http://<server-ip>:5001`
   - Open WebUI: `http://<server-ip>:3000`

## Notes
- The bootstrap playbook installs Docker via apt. For non-Debian hosts, update
  `docker_packages`.
- The Llama model is pulled with `ollama pull` and may take time.
- Set `llama_model` to change the exact Llama 3.2 variant.
- Secure the exposed ports (firewall, VPN, or reverse proxy) before use.
- To run both steps:
  `ansible-playbook -i inventories/sandbox/hosts.yml playbooks/site.yml`
