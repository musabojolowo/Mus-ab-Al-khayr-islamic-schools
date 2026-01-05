// Page section animation
document.querySelectorAll("section").forEach((sec)=>{
  sec.style.opacity=0;
  sec.style.transform="translateY(40px)";
  setTimeout(()=>{
    sec.style.transition="1s";
    sec.style.opacity=1;
    sec.style.transform="translateY(0)";
  },200);
});

// Dark mode toggle button
const toggle=document.createElement("button");
toggle.innerText="🌙";
toggle.style.position="fixed";
toggle.style.left="20px";
toggle.style.bottom="20px";
toggle.style.padding="10px";
toggle.style.borderRadius="50%";
toggle.style.border="none";
toggle.style.cursor="pointer";
toggle.style.zIndex=101;
document.body.appendChild(toggle);

toggle.onclick=()=>{
  document.body.classList.toggle("dark");
};
// Dark mode styles

// Admission form: photo preview, validation, and autoresponder wiring
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('admissionForm');
  if(!form) return;

  const emailField = document.getElementById('email');
  const replyTo = document.getElementById('_replyto');
  const photoInput = document.getElementById('photo');
  const preview = document.getElementById('photoPreview');
  const MAX_SIZE = 2 * 1024 * 1024; // 2MB

  // Show image preview when user selects a file
  photoInput.addEventListener('change', function(e){
    preview.innerHTML = '';
    const file = photoInput.files[0];
    if(!file) return;
    if(!file.type.startsWith('image/')){
      preview.innerText = 'Please select a valid image file.';
      photoInput.value = '';
      return;
    }
    if(file.size > MAX_SIZE){
      preview.innerText = 'File is too large. Maximum size is 2MB.';
      photoInput.value = '';
      return;
    }
    const img = document.createElement('img');
    img.alt = 'Selected photo';
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  });

  // Before submitting, set the _replyto hidden field so FormSubmit can use it
  form.addEventListener('submit', function(e){
    if(emailField && replyTo){
      replyTo.value = emailField.value;
    }
    // Re-validate file presence/size
    const f = photoInput.files[0];
    if(!f){
      e.preventDefault();
      alert('Please upload a passport photo (max 2MB).');
      return false;
    }
    if(f.size > MAX_SIZE){
      e.preventDefault();
      alert('Selected photo is too large. Please choose a file under 2MB.');
      return false;
    }
    return true;
  });
});