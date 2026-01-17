const state = {
  models: [],
  messages: [],
  activeModel: "",
  busy: false,
};

const elements = {
  statusBadge: document.getElementById("statusBadge"),
  statusText: document.getElementById("statusText"),
  modelSelect: document.getElementById("modelSelect"),
  modelHint: document.getElementById("modelHint"),
  refreshModels: document.getElementById("refreshModels"),
  systemPrompt: document.getElementById("systemPrompt"),
  clearChat: document.getElementById("clearChat"),
  messages: document.getElementById("messages"),
  chatForm: document.getElementById("chatForm"),
  chatInput: document.getElementById("chatInput"),
  sendButton: document.getElementById("sendButton"),
  selectedModel: document.getElementById("selectedModel"),
};

function setStatus(text, level) {
  elements.statusText.textContent = text;
  elements.statusBadge.className = "status__badge";
  if (level) {
    elements.statusBadge.classList.add(`status__badge--${level}`);
  } else {
    elements.statusBadge.classList.add("status__badge--idle");
  }
}

function setBusy(isBusy) {
  state.busy = isBusy;
  elements.sendButton.disabled = isBusy;
  elements.chatInput.disabled = isBusy;
  elements.refreshModels.disabled = isBusy;
}

function updateSelectedModel() {
  const model = elements.modelSelect.value || "-";
  state.activeModel = model;
  elements.selectedModel.textContent = `Model: ${model}`;
}

function renderModelOptions(models) {
  elements.modelSelect.innerHTML = "";
  if (!models.length) {
    const option = document.createElement("option");
    option.textContent = "No models installed";
    option.value = "";
    option.disabled = true;
    option.selected = true;
    elements.modelSelect.appendChild(option);
    elements.modelHint.textContent = "Use ollama pull to install models.";
    updateSelectedModel();
    return;
  }

  models.forEach((model) => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    elements.modelSelect.appendChild(option);
  });

  elements.modelHint.textContent = `${models.length} model(s) detected.`;
  elements.modelSelect.value = state.activeModel || models[0];
  updateSelectedModel();
}

async function fetchModels() {
  setStatus("Loading models", "busy");
  try {
    const response = await fetch("/ollama/api/tags");
    if (!response.ok) {
      throw new Error(`Model fetch failed (${response.status})`);
    }
    const data = await response.json();
    const models = (data.models || [])
      .map((model) => model.name)
      .filter(Boolean)
      .sort();
    state.models = models;
    renderModelOptions(models);
    setStatus(models.length ? "Models ready" : "No models found", models.length ? "ok" : "warn");
  } catch (error) {
    elements.modelHint.textContent = "Unable to reach Ollama.";
    renderModelOptions([]);
    setStatus("Model fetch failed", "error");
  }
}

function addMessage(role, content) {
  const message = document.createElement("div");
  message.className = `message message--${role}`;
  message.textContent = content;
  elements.messages.appendChild(message);
  elements.messages.scrollTop = elements.messages.scrollHeight;
  return message;
}

function clearMessages() {
  state.messages = [];
  elements.messages.innerHTML = "";
  addMessage("system", "Conversation cleared. Ready for a new prompt.");
}

async function sendMessage(event) {
  event.preventDefault();
  const text = elements.chatInput.value.trim();
  if (!text || state.busy) {
    return;
  }

  const model = elements.modelSelect.value;
  if (!model) {
    setStatus("Select a model before sending", "warn");
    return;
  }

  elements.chatInput.value = "";
  const userMessage = { role: "user", content: text };
  state.messages.push(userMessage);
  addMessage("user", text);

  const placeholder = addMessage("assistant", "Thinking...");
  setBusy(true);
  setStatus("Generating response", "busy");

  const payloadMessages = [];
  const systemPrompt = elements.systemPrompt.value.trim();
  if (systemPrompt) {
    payloadMessages.push({ role: "system", content: systemPrompt });
  }
  payloadMessages.push(...state.messages);

  try {
    const response = await fetch("/ollama/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: payloadMessages,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Chat failed (${response.status})`);
    }

    const data = await response.json();
    const reply =
      (data.message && data.message.content) ||
      data.response ||
      "No response returned.";
    placeholder.textContent = reply;
    state.messages.push({ role: "assistant", content: reply });
    setStatus("Ready", "ok");
  } catch (error) {
    placeholder.textContent = `Error: ${error.message}`;
    placeholder.classList.add("message--error");
    setStatus("Request failed", "error");
  } finally {
    setBusy(false);
  }
}

elements.refreshModels.addEventListener("click", fetchModels);
elements.modelSelect.addEventListener("change", updateSelectedModel);
elements.clearChat.addEventListener("click", clearMessages);
elements.chatForm.addEventListener("submit", sendMessage);
elements.chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    elements.chatForm.requestSubmit();
  }
});

addMessage("system", "MBUX AI Sandbox ready. Load models to begin.");
fetchModels();
