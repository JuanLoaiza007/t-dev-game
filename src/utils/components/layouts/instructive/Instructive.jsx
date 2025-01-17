import React, { useRef } from 'react'

export default function Instructive() {
  const imgRef = useRef()

  const pathImagenes = './assets/images/instructives/'

  const teclaSalto = "'Espacio'"
  const teclaCorrer = "'Shift'"
  const teclaDance = "'Q'"

  const textOptions = [
    `Tip: Presiona ${teclaCorrer} mientras te mueves para correr o no correras`,
    `Tip: Manten presionado ${teclaSalto} para saltar más alto`,
    'Tip: Mientras camines te moverás más lento que si corres.',
    'Tip: Los NPC tienen una vida muy corta gracias a ti.',
    'Tip: Evita los obstáculos para llegar más lejos.',
    `Tip: Presiona ${teclaCorrer} mientras te mueves para correr o no correras`,
    `Tip: Manten presionado ${teclaSalto} para saltar más alto`,
    'Tip: Mientras saltas no puedes bailar.',
    'Tip: No te preocupes, este gato también cae parado.',
    `Tip: Presiona ${teclaCorrer} mientras te mueves para correr o no correras`,
    `Tip: Manten presionado ${teclaSalto} para saltar más alto`,
    'Tip: Si no golpeas no harás daño.',
    'Tip: Si te golpean te harán daño, no dejes que te golpeen',
    `Tip: Manten presionado ${teclaDance} para celebrar`
  ]

  const imageOptions = [
    'level2_1',
    'level2_2',
    'level2_3',
    'level2_4',
    'level2_5',
    'level2_6'
  ]

  const randomIndex = Math.floor(Math.random() * imageOptions.length)
  const randomIndexText = Math.floor(Math.random() * textOptions.length)

  const selectedText = textOptions[randomIndexText]

  return (
    <div className='relative w-full h-full flex justify-center items-center bg-gradient-to-r from-blue-800 via-blue-600 to-blue-300 select-none overflow-hidden'>
      <h1 className='absolute top-4 left-4 text-white text-5xl font-bold'>
        {'Cargando...'}
      </h1>
      <img
        ref={imgRef}
        src={`${pathImagenes}${imageOptions[randomIndex]}.png`}
        alt='Instructive'
        className='w-full h-full object-cover select-none'
      />
      <h1 className='absolute bottom-4 right-4 bg-blue-800 p-2 text-white text-4xl font-bold'>
        {selectedText}
      </h1>
    </div>
  )
}
