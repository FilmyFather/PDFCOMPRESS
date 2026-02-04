const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/compress", upload.single("file"), (req, res) => {
  const input = req.file.path;
  const output = `out-${Date.now()}.pdf`;

  exec(
    `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${output} ${input}`,
    () => {
      res.download(output, "compressed.pdf", () => {
        fs.unlinkSync(input);
        fs.unlinkSync(output);
      });
    }
  );
});

app.listen(3000, ()=>console.log("Running"));
