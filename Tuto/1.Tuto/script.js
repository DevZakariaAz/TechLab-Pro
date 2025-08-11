function calculer() {
  let c1 = parseFloat(document.getElementById("c1").value);
  let v1 = parseFloat(document.getElementById("v1").value);
  let c2 = parseFloat(document.getElementById("c2").value);
  let v2 = parseFloat(document.getElementById("v2").value);

  const uniteC = document.getElementById("uniteConcentration").value;
  const uniteV = document.getElementById("uniteVolume").value;

  let result = "";

  if (isNaN(c1)) {
    c1 = (c2 * v2) / v1;
    result = `Concentration initiale : ${c1.toFixed(2)} ${uniteC}`;
  } else if (isNaN(v1)) {
    v1 = (c2 * v2) / c1;
    result = `Volume initial : ${v1.toFixed(2)} ${uniteV}`;
  } else if (isNaN(c2)) {
    c2 = (c1 * v1) / v2;
    result = `Concentration finale : ${c2.toFixed(2)} ${uniteC}`;
  } else if (isNaN(v2)) {
    v2 = (c1 * v1) / c2;
    result = `Volume final : ${v2.toFixed(2)} ${uniteV}`;
  } else {
    result = "Laissez une valeur vide pour la calculer.";
  }

  document.getElementById("resultat").innerText = result;
}
