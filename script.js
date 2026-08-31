const imgs=[
'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80'
];
const products=[
{brand:'Reformation',title:'Linen midi dress',size:'XS / UK 6',condition:'Very good',price:310,likes:42,img:imgs[0]},
{brand:'Damson Madder',title:'Bow-detail blouse',size:'S / UK 8–10',condition:'New without tags',price:185,likes:28,img:imgs[1]},
{brand:'Mango',title:'Suede-effect jacket',size:'S / UK 8–10',condition:'Very good',price:220,likes:16,img:imgs[2]},
{brand:'COS',title:'Pleated satin skirt',size:'S / UK 8–10',condition:'Very good',price:135,likes:31,img:imgs[3]},
{brand:'Zara',title:'Embroidered maxi dress',size:'S / UK 8–10',condition:'Good',price:95,likes:12,img:imgs[4]},
{brand:'H&M Premium',title:'Cotton poplin shirt',size:'M / UK 12',condition:'New with tags',price:80,likes:9,img:imgs[5]},
{brand:'New Balance',title:'530 trainers',size:'EU 38',condition:'Very good',price:260,likes:57,img:imgs[6]},
{brand:'Massimo Dutti',title:'Relaxed linen set',size:'S / UK 8–10',condition:'Very good',price:240,likes:21,img:imgs[7]},
{brand:'& Other Stories',title:'Tie-front top',size:'XS / UK 6',condition:'New without tags',price:110,likes:18,img:imgs[1]},
{brand:'Arket',title:'Wool-blend coat',size:'S / UK 8–10',condition:'Very good',price:345,likes:36,img:imgs[2]},
{brand:'Nike',title:'Retro running trainers',size:'EU 39',condition:'Good',price:145,likes:14,img:imgs[6]},
{brand:'Ralph Lauren',title:'Cable knit cardigan',size:'S',condition:'Very good',price:175,likes:24,img:imgs[5]}
];
let current=products[0];
function card(p,i){const incl=Math.round(p.price*1.055+1);return `<article class="product" onclick="openItem(${i})"><div class="photoWrap"><img src="${p.img}" alt="${p.title}"><div class="badges">${i%4===0?'<span class="badge">Bumped</span>':''}</div><button class="heart" onclick="event.stopPropagation();this.textContent=this.textContent==='♡'?'♥':'♡';toast('Favourite updated')">♡</button></div><div class="pInfo"><div class="sellerLine">♡ ${p.likes}</div><div class="brand">${p.brand}</div><div class="detailLine">${p.size} · ${p.condition}</div><div class="price">AED ${p.price}</div><div class="incl">AED ${incl} incl.</div></div></article>`}
function render(){document.getElementById('homeProducts').innerHTML=products.slice(0,10).map((p,i)=>card(p,i)).join('');document.getElementById('catalogProducts').innerHTML=products.map((p,i)=>card(p,i)).join('');document.getElementById('profileProducts').innerHTML=products.slice(2,6).map((p,i)=>card(p,i+2)).join('')}
function go(id){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active');window.scrollTo(0,0);location.hash=id}
function catalog(name){document.getElementById('catalogTitle').textContent=name||'Catalogue';go('catalog')}
function runSearch(){const q=document.getElementById('globalSearch').value.trim();document.getElementById('catalogTitle').textContent=q?`Search results for “${q}”`:'Catalogue';go('catalog')}
function openItem(i){current=products[i]||products[0];document.getElementById('itemTitle').textContent=current.title;document.getElementById('itemMeta').textContent=`${current.size} · ${current.condition}`;document.getElementById('itemPrice').textContent=`AED ${current.price}`;document.getElementById('itemIncl').textContent=`AED ${Math.round(current.price*1.055+1)} incl. Buyer Protection`;document.getElementById('itemBrand').textContent=current.brand;['g1','g2','g3','g4'].forEach((id,n)=>document.getElementById(id).src=imgs[(i+n)%imgs.length]);go('item')}
function showModal(html){document.getElementById('modal').innerHTML=`<button class="close" onclick="closeModal()">×</button>${html}`;document.getElementById('overlay').classList.add('show')}
function closeModal(){document.getElementById('overlay').classList.remove('show')}
function authModal(mode){showModal(`<h2>${mode==='login'?'Log in':'Join ClosetLoop'}</h2><p class="tip">${mode==='login'?'Welcome back.':'Buy and sell in a few taps.'}</p><div class="field"><label>Email</label><input value="demo@example.com"></div><div class="field"><label>Password</label><input type="password" value="password"></div><button class="btn primary" onclick="closeModal();toast('${mode==='login'?'Logged in':'Account created'} — demo')">${mode==='login'?'Log in':'Create account'}</button><button class="btn" onclick="toast('Social sign-in demo')">Continue with Apple</button>`) }
function offerModal(){showModal(`<h2>Make an offer</h2><p class="tip">${current.brand} · ${current.title}</p><div class="field"><label>Your offer</label><input value="AED ${Math.round(current.price*.9)}"></div><button class="btn primary" onclick="closeModal();toast('Offer sent to seller')">Send offer</button>`)}
function checkoutModal(){const total=Math.round(current.price*1.055+1);showModal(`<h2>Checkout</h2><p class="tip">${current.title}</p><div class="paybox"><div style="display:flex;justify-content:space-between"><span>Item</span><b>AED ${current.price}</b></div><div style="display:flex;justify-content:space-between;margin-top:8px"><span>Buyer Protection</span><b>AED ${total-current.price}</b></div><hr style="border:0;border-top:1px solid #ddd"><div style="display:flex;justify-content:space-between;font-size:18px"><b>Total</b><b>AED ${total}</b></div></div><div class="field"><label>Delivery address</label><input value="Yas Island, Abu Dhabi"></div><div class="field"><label>Card</label><input value="4242 4242 4242 4242"></div><button class="btn primary" onclick="closeModal();toast('Demo order placed ✓')">Pay AED ${total}</button><p class="tip">Demo only. No real payment is processed.</p>`)}
function publishModal(){showModal(`<h2>Your item is live ✨</h2><p>“Cream embroidered blouse” has been added to your ClosetLoop wardrobe.</p><button class="btn primary" onclick="closeModal();go('profile')">View my wardrobe</button><button class="btn" onclick="closeModal();go('sell')">List another item</button>`)}
function sendMessage(){const input=document.getElementById('chatMessage');if(!input.value.trim())return;const b=document.createElement('div');b.className='bubble me';b.textContent=input.value;document.getElementById('messages').appendChild(b);input.value='';}
let tt;function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),1800)}
render();if(location.hash&&document.getElementById(location.hash.slice(1)))go(location.hash.slice(1));