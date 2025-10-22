  document.getElementById("uploadForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("hey");
      
      const msg = document.getElementById("responseMsg");
      const form = e.target;

      
      const title = form.title.value.trim();
      const author = form.author.value.trim();
      const genre = form.genre.value.trim();
      const summary = form.summary.value
      const thumbnail = form.thumbnail.files[0];
      const book = form.bookFile.files[0];

      if (!title || !author || !genre || !thumbnail || !book || !summary) {
        msg.innerHTML = `<span class='text-danger'><i class="fas fa-exclamation-circle"></i> All fields are mandatory!</span>`;
        return;
      }

     const res = await axios.get(`$${BASE_URL_BOOKS}/add`,{title, author,summary, genre,thumbnail,book})
     console.log(res.data);
     

      msg.innerHTML = res.ok
        ? `<span class='text-success'><i class="fas fa-check-circle"></i> ${res.data.message}</span>`
        : `<span class='text-danger'><i class="fas fa-times-circle"></i> ${res.data.message}</span>`;

      if (res.ok) form.reset();
    });
 