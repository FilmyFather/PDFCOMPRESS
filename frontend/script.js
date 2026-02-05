async function compress(){
  const file = document.getElementById("pdf").files[0];
  if(!file){
    alert("Select PDF first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  document.getElementById("status").innerText="⏳ Compressing...";

 fetch("https://pdfcompress-ozai.onrender.com/compress", {
    method:"POST",
    body:formData
  });

  const blob = await res.blob();
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download="compressed.pdf";
  a.click();

  document.getElementById("status").innerText="✅ Done";
}
