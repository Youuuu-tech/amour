<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>L'Amour 3D Projet</title>
<style>
  /* Reset & body */
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: Arial, sans-serif; overflow-x: hidden; background: #ffffff; color:#333; }

  /* Navbar */
  nav { position: fixed; top:0; width:100%; background: #000000; display:flex; justify-content:center; z-index:1000; box-shadow:0 2px 5px rgba(0,0,0,0.1); }
  nav ul { display:flex; list-style:none; }
  nav ul li { margin:0 20px; }
  nav ul li a { text-decoration:none; color:#ffffff; font-weight:bold; padding:15px; display:block; transition:0.3s; }
  nav ul li a:hover { background:#d81b60; color:white; border-radius:8px; }

  /* Sections */
  section { min-height:100vh; padding:100px 50px 50px 50px; position:relative; }
  section h1,h2 { text-align:center; color:#d81b60; margin-bottom:30px; }
  section p { font-size:18px; line-height:1.6; margin-bottom:20px; opacity:0; transform:translateY(20px); transition:all 1s ease; }
  section.visible p { opacity:1; transform:translateY(0); }

  /* Gift Button */
  .gift-button { display:block; margin:50px auto; padding:15px 30px; font-size:20px; background:#d81b60; color:white; border:none; border-radius:10px; cursor:pointer; transition:0.3s; }
  .gift-button:hover { background:#ad1457; }
  .gift-box { display:none; text-align:center; margin-top:30px; padding:20px; background:#fff3e0; border-radius:15px; box-shadow:0 5px 15px rgba(0,0,0,0.2); font-size:22px; font-weight:bold; color:#6a1b9a; }

  /* 3D Canvas */
  canvas { position: fixed; top:0; left:0; width:100%; height:100%; z-index:-1; }
</style>
</head>
<body>

<nav>
  <ul>
    <li><a href="#accueil">Accueil</a></li>
    <li><a href="#philosophie">Philosophie</a></li>
    <li><a href="#poesie">Poésie</a></li>
    <li><a href="#cinema">Cinéma</a></li>
    <li><a href="#histoires">Histoires</a></li>
    <li><a href="#cadeau">Cadeau</a></li>
  </ul>
</nav>

<canvas id="heartCanvas"></canvas>

<section id="accueil">
  <h1>Bienvenue dans le Monde de l'Amour ❤️</h1>
  <p>L’amour est un sentiment universel qui inspire depuis des siècles...</p>
  <p>Il peut prendre différentes formes : passion, tendresse, amitié ou même sacrifice.</p>
</section>

<section id="philosophie">
  <h2>Philosophie de l'Amour</h2>
  <p>Les philosophes grecs comme Platon et Aristote ont réfléchi sur la nature de l'amour...</p>
  <p>L'amour est considéré comme un moteur de la vie et de la morale.</p>
</section>

<section id="poesie">
  <h2>Poésie Française</h2>
  <p>Des poètes comme Victor Hugo et Paul Éluard ont écrit des vers passionnés sur l'amour...</p>
  <p>La poésie exprime la beauté, la douleur et la joie de l'amour.</p>
</section>

<section id="cinema">
  <h2>L'Amour au Cinéma</h2>
  <p>Des films emblématiques comme Roméo + Juliette, Titanic ou La La Land illustrent différentes facettes de l'amour...</p>
  <p>Le cinéma permet de ressentir l'intensité des émotions amoureuses visuellement et musicalement.</p>
</section>

<section id="histoires">
  <h2>Histoires d'Amour Célèbres</h2>
  <p>Roméo et Juliette, Tristan et Iseult, Layla et Majnun, Antoine et Cléopâtre...</p>
  <p>Ces histoires ont traversé le temps et inspiré les arts et la littérature.</p>
</section>

<section id="cadeau">
  <button class="gift-button" onclick="openGift()">🎁 Ouvrir le Cadeau</button>
  <div class="gift-box" id="giftBox">Texte édité par <b>Iyed Arfaoui</b> et <b>Aziz Khmiri</b></div>
</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
// 3D Heart
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('heartCanvas'), alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);

const heartShape = new THREE.Shape();
heartShape.moveTo(0,0);
heartShape.bezierCurveTo(0,0,-0.5,-0.5,-1,0);
heartShape.bezierCurveTo(-1.5,1,0,1.5,0,2);
heartShape.bezierCurveTo(0,1.5,1.5,1,1,0);
heartShape.bezierCurveTo(0.5,-0.5,0,0,0,0);
const geometry = new THREE.ExtrudeGeometry(heartShape,{depth:0.3, bevelEnabled:true, bevelThickness:0.05, bevelSize:0.05, bevelSegments:2});
const material = new THREE.MeshPhongMaterial({color:0xd81b60, shininess:100});
const heart = new THREE.Mesh(geometry, material);
scene.add(heart);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5,5,5);
scene.add(light);
camera.position.z = 5;

window.addEventListener("scroll", ()=>{
  let scrollY = window.scrollY;
  heart.position.x = Math.sin(scrollY*0.005)*2;
  heart.position.y = Math.cos(scrollY*0.005)*2;
  heart.rotation.y = scrollY*0.002;
});

function animate(){
  requestAnimationFrame(animate);
  heart.rotation.x += 0.01;
  renderer.render(scene, camera);
}
animate();

const sections = document.querySelectorAll('section');
window.addEventListener('scroll', ()=>{
  sections.forEach(sec=>{
    const rect = sec.getBoundingClientRect();
    if(rect.top < window.innerHeight*0.8){ sec.classList.add('visible'); }
  });
});

function openGift(){ document.getElementById('giftBox').style.display='block'; }
</script>

</body>
</html>
