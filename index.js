const cats = [
    {id: '1', title: 'Jony', price: 20, img: '/Users/alexnik/Desktop/Снимок экрана 2020-03-09 в 21.24.54.png'},
    {id: '2', title: 'Beny', price: 10, img: '/Users/alexnik/Desktop/Снимок экрана 2020-03-09 в 21.24.54.png'},
    {id: '3', title: 'Lazy', price: 30, img: '/Users/alexnik/Desktop/Снимок экрана 2020-03-09 в 21.24.54.png'},
]



const modal = $.modal({
    title: 'My model',
    content: `<p>This is my content</p>`,
    closable: true,
    footerButtons: [
        {text: 'Ok', type: 'primary', handler(){
            console.log('Primery btn click');
            modal.close()
        }},
        {text: 'Cancel', type: 'danger', handler(){
            console.log('Danger btn click');
            modal.close()
        }}
    ]
})