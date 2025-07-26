const chatbox = document.getElementById("chatbox");

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function send() {
  const input = document.getElementById("userInput");
  const query = input.value;
  appendMessage("You", query);
  input.value = "";

  let responseText = "Sorry, I didn't understand that.";

  try {
    if (/top\s*5/i.test(query)) {
      const res = await fetch("http://localhost:5000/top-products");
      const data = await res.json();
      responseText = data.map(p => `${p.name} (${p.total_sold} sold)`).join("<br>");
    } else if (/order\s+ID\s+(\d+)/i.test(query)) {
      const match = query.match(/order\s+ID\s+(\d+)/i);
      const orderId = match[1];
      const res = await fetch(`http://localhost:5000/order-status/${orderId}`);
      const data = await res.json();
      responseText = data.status ? `Status: ${data.status}` : "Order found, but no status available.";
    } else if (/how many (.+) are left/i.test(query.toLowerCase())) {
      const match = query.match(/how many (.+?) are/i);
      if (match && match[1]) {
        const name = match[1].trim();
        const res = await fetch(`http://localhost:5000/inventory/${encodeURIComponent(name)}`);
        const data = await res.json();
        responseText = data.stock !== undefined
          ? `${data.product}: ${data.stock} in stock.`
          : "Product not found.";
      }
    }
  } catch (e) {
    responseText = "Error fetching data. Is the backend running?";
  }

  appendMessage("Bot", responseText);
}
