
    var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");

    function opentab(tabname){
        for(tablink of tablinks){
            tablink.classList.remove("active-link");
        }
        for(tabcontent of tabcontents){
            tabcontent.classList.remove("active-tab");
        }
        event.currentTarget.classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");
    }


    var sidemeu = document.getElementById("sidemenu");

    function openmenu(){
        sidemeu.style.right = "0";
    }
    function closemenu(){
        sidemeu.style.right = "-200px";
    }

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzkd5ZIfMet4un8droq8cTfpTK_DyZvkKqTy8mKu-G6VhrPsVgX_n279xZaRPSP5Egy/exec'
    const form = document.forms['submit-to-google-sheet']
    const msg = document.getElementById("msg")
  
    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response =>{
            msg.innerHTML = "Your message has been sent!"
            setTimeout(function(){
                msg.innerHTML = ""
            },5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
    })

const elements = document.querySelectorAll('.fade-section');
window.addEventListener('scroll', () => {
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});



  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("visited")) {
      document.getElementById("intro").style.display = "none";
      document.querySelector(".page-fade").style.opacity = "1";
    } else {
      localStorage.setItem("visited", "true");
    }
  });

// ===== MODAL CONTROL =====
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex"; // show modal
    document.body.style.overflow = "hidden"; // prevent background scroll
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none"; // hide modal
    document.body.style.overflow = "auto"; // restore scroll
  }
}

// Optional: Close modal when clicking outside the content
window.onclick = function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
};
