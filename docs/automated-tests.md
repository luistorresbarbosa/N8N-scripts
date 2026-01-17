# Automated Tests Guide

This document describes how to set up automated checks for the Ansible
scaffold in this repo. Use it locally or in CI to validate playbooks and YAML.

## What to test
- Ansible playbook syntax checks
- Ansible linting
- YAML formatting and structure

## Local setup (recommended)
1. Create a virtual environment:
   `python3 -m venv .venv`
2. Activate it:
   `source .venv/bin/activate`
3. Install tools:
   `pip install --upgrade ansible ansible-lint yamllint`

## Run checks locally
From the repo root:
- `ansible-playbook --syntax-check ansible/playbooks/bootstrap.yml`
- `ansible-playbook --syntax-check ansible/playbooks/deploy-llama.yml`
- `ansible-playbook --syntax-check ansible/playbooks/deploy-llm-sandbox-ui.yml`
- `ansible-playbook --syntax-check ansible/playbooks/site.yml`
- `ansible-lint ansible/playbooks`
- `yamllint ansible docs`

## Optional CI approach
If you use GitHub Actions, create a workflow that:
1. Installs Python and the tools above.
2. Runs the same commands from "Run checks locally".
3. Fails the build if any command returns non-zero.

## Notes
- These checks do not provision or connect to a server.
- For integration testing, run the playbooks against a staging VM.
