const API = "https://zgzaofnnkfndriljkeqd.supabase.co/functions/v1";

async function post(rota, corpo) {
  const r = await fetch(`${API}/${rota}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  });
  return { status: r.status, dados: await r.json().catch(() => ({})) };
}

const botao = document.getElementById("comprar");
if (botao) {
  botao.addEventListener("click", async (e) => {
    e.preventDefault();
    botao.textContent = "Abrindo o Mercado Pago…";
    const { dados } = await post("checkout", {});
    if (!dados.url) {
      botao.textContent = "Comprar por Pix — R$ 29";
      document.getElementById("aviso").innerHTML = "<small>Não consegui abrir o pagamento agora. Tente de novo em instantes.</small>";
      return;
    }
    localStorage.setItem("kitmei_ref", dados.ref);
    location.href = dados.url;
  });
}
