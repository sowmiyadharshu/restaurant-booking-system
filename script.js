const form = document.getElementById('bookingForm');

function getBookings(){
  return JSON.parse(localStorage.getItem('bookings')) || [];
}

function saveBookings(bookings){
  localStorage.setItem('bookings', JSON.stringify(bookings));
}

if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();

    const booking = {
      id: Date.now(),
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      guests: document.getElementById('guests').value,
      tableSize: document.getElementById('tableSize').value,
      status: 'Pending'
    };

    const bookings = getBookings();
    bookings.push(booking);
    saveBookings(bookings);

    const msg = document.getElementById('message');
    msg.textContent = 'Booking submitted successfully!';
    msg.className = 'success';
    form.reset();
  });
}

function adminLogin(){
  const user = document.getElementById('adminUser').value;
  const pass = document.getElementById('adminPass').value;
  const msg = document.getElementById('loginMsg');

  if(user === 'admin' && pass === '1234'){
    localStorage.setItem('adminLoggedIn', 'true');
    showDashboard();
  }else{
    msg.textContent = 'Invalid username or password';
    msg.className = 'error';
  }
}

function showDashboard(){
  const loginBox = document.getElementById('loginBox');
  const dashboard = document.getElementById('dashboard');
  if(loginBox && dashboard){
    loginBox.classList.add('hidden');
    dashboard.classList.remove('hidden');
    displayBookings();
  }
}

function displayBookings(){
  const bookingList = document.getElementById('bookingList');
  if(!bookingList) return;

  const bookings = getBookings();
  bookingList.innerHTML = '';

  if(bookings.length === 0){
    bookingList.innerHTML = '<tr><td colspan="9" style="text-align:center">No bookings found</td></tr>';
    return;
  }

  bookings.forEach((b)=>{
    bookingList.innerHTML += `
      <tr>
        <td>${b.name}</td>
        <td>${b.phone}</td>
        <td>${b.email}</td>
        <td>${b.date}</td>
        <td>${b.time}</td>
        <td>${b.guests}</td>
        <td>${b.tableSize}</td>
        <td><span class="status">${b.status}</span></td>
        <td><button class="delete" onclick="deleteBooking(${b.id})">Delete</button></td>
      </tr>`;
  });
}

function deleteBooking(id){
  const bookings = getBookings().filter(b => b.id !== id);
  saveBookings(bookings);
  displayBookings();
}

function logout(){
  localStorage.removeItem('adminLoggedIn');
  location.reload();
}

if(localStorage.getItem('adminLoggedIn') === 'true'){
  showDashboard();
}
