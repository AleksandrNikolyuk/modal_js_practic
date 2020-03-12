Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}


function _createModalFooter(buttons = []){
    if(buttons.length === 0) {
        return document.createElement('div')
    }
    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop
        wrap.appendChild($btn)
    })
    return wrap
}


function _createCard(options) {
    const cards = document.createElement('div')
    cards.classList.add('row')
    options.cats.forEach(e => {
        cards.insertAdjacentHTML('afterbegin', `
            <div class="col">
                <div class="card" >
                    <img class="card-img-top" style="height: 300px;" src='/Users/alexnik/Desktop/Снимок экрана 2020-03-09 в 21.24.54.png'>
                    <div class="card-body">
                        <h5 class="card-title">${e.title || 'No name'}</h5>
                    </div>
                </div>
            </div>
        `)
        const buttonCards = _createModalFooter(options.cardsButtons)
        buttonCards.appendAfter(cards.querySelector('.card-title'))
    })
    
    document.body.appendChild(cards)
    return cards
}



function _createModal(options) {
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close='true'>
        <div class="modal-window">
            <div class="modal-header">
                <span class='modal-title'>${options.title || 'Modal'}</span>
                ${options.closable ? `<button class='modal-close' data-close='true'>&times</button>` : ''}
            </div>
            <div class="modal-body" data-content>${options.content || ''}</div>
        </div>
    </div>
    `)
    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}

/*
    1 -  title: string  
    2 - 



*/

$.modal = function(options) {

    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    const $cards = _createCard(options)
    let clothing = false
    let destroyed = false

    const modal = {
        open() {
            if (destroyed) {return console.log('Not modal window');
            }
           !clothing && $modal.classList.add('open')
        },
        close() {
            clothing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout (() => {
                $modal.classList.remove('hide')
                clothing = false
            }, ANIMATION_SPEED)
        },
        
    }

    const listener = event => {
        if (event.target.dataset.close) {
            modal.close()
        }
    }

    $modal.addEventListener('click', listener),
    window.addEventListener('load', $cards)

    return Object.assign(modal, {
        destroy() {
            destroyed - true
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
            // $cards.querySelector('.card-title').innerHTML = html
        }
    })
}