const $songsContainer = document.querySelector("section#songlist")
const $cart = document.querySelector("section#cart ul")
let songs = []
let favs = []

loadItems()

function loadItems() {
    fetch("/songs")
        .then( response => response.json() )
        .then( response => {
        console.log(response)
            createItemCards(response) 
        })
        .catch(err => console.error(err))
}

function createItemCards(_songs) {
    songs = _songs
    const songsHTML = _songs.map(song => 
        `<div class="song">
            <h3>Name: ${song.song_name}</h3>
            <h4>Artist: ${song.writer}</h4>
            <button onClick="addToCart(${song.songid}, event)">Add to Cart</button>
        </div>`
    ).join('')
    $songsContainer.innerHTML = songsHTML    
}

function login(event) {
    event.preventDefault()
    //create order object
    const $form = document.forms[0]
    const order = {
        user: {
            username: $form.username.value,
            password: $form.password.value
        }
    }
    //POST on /login
    const config = {
        method: "POST",
        body: JSON.stringify(),
        headers: {
            "Content-Type":"application/json"
        }
    }
    fetch("/login",config)
        .then( response => response.json() )
        .then( response => console.log(response) )
        .catch(err => console.error(err))

}

function addSong(id, event) {
    const song = songs.find(song => song.songid == id)

    const $newSong = document.createElement("li")
    $newSong.innerHTML = 
        `${song.songid, song.name, song.writer, song.album}`
    $songlist.append($newSong)
    songs.push(song)
    document.querySelector("span#itemCount").innerHTML = songs.length
}