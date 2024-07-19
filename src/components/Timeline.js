import React, { useEffect, useRef, useState } from 'react';
import './Timeline.css';

const timelineData = [
    { title: "Profile" },
    { title: "Experience" },
    { title: "Skills" },
    { title: "Education" },
];

const Timeline = ({ onPipeClick }) => {
  const marioRef = useRef(null);
  const eventsContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentPipe, setCurrentPipe] = useState(null);
  const [buffers, setBuffers] = useState({});
  const [context, setContext] = useState(null);
  let int1;

  useEffect(() => {
    if (window.AudioContext || window.webkitAudioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      setContext(audioContext);

      const gainNode = audioContext.createGain();
      gainNode.gain.value = 1; // set volume to 100%
    }
  }, []);

  useEffect(() => {
    if (context) {
      const loadBuffers = (urls, ids) => {
        if (typeof urls === 'string') urls = [urls];
        if (typeof ids === 'string') ids = [ids];

        urls.forEach((url, index) => {
          window
            .fetch(url)
            .then((response) => response.arrayBuffer())
            .then((arrayBuffer) =>
              context.decodeAudioData(
                arrayBuffer,
                (audioBuffer) => {
                  setBuffers((prevBuffers) => ({
                    ...prevBuffers,
                    [ids[index]]: audioBuffer,
                  }));
                },
                (error) => console.log(error)
              )
            );
        });
      };

      loadBuffers(
        [
          'https://assets.codepen.io/439000/jump.mp3',
          'https://assets.codepen.io/439000/smb_pipe.mp3',
        ],
        ['jump', 'pipe']
      );
    }
  }, [context]);

  const playSfx = (id) => {
    if (!context || !buffers[id]) return;
    const buffer = buffers[id];
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start();
  };

  const pipeHandler = (index) => {
    clearInterval(int1);
    document.getElementById('info').style.display = 'none';

    // clear old
    if (currentPipe) currentPipe.classList.remove('active');

    // walk
    const xpos = -100 - index * 150 - 25;
    const curXpos = -100 - currentIndex * 150 - 25;
    const distance = curXpos - xpos;
    const duration = Math.abs(distance) * 3;

    eventsContainerRef.current.style.transitionDuration = `${duration}ms`;
    eventsContainerRef.current.style.transform = `translateX(${xpos}px)`;
    playSfx('jump');

    const dir = distance < 0 ? 'left' : 'right';
    marioRef.current.classList.remove(
      'idle',
      'walk-left',
      'walk-right',
      'search-left',
      'search-right'
    );
    marioRef.current.classList.add(`walk-${dir}`);
    int1 = setTimeout(
      (dir, target) => {
        marioRef.current.classList.remove(`walk-${dir}`);
        marioRef.current.classList.add(`search-${dir}`);
        target.classList.add('active');
        playSfx('pipe');
      },
      duration,
      dir,
      eventsContainerRef.current.children[index]
    );

    setCurrentIndex(index);
    setCurrentPipe(eventsContainerRef.current.children[index]);
    onPipeClick(timelineData[index].title); // Update the current section title
  };

  return (
    <div className="container">
      <div id="mario" ref={marioRef} className="mario idle"></div>
      <div id="events" ref={eventsContainerRef}>
        {timelineData.map((event, index) => (
          <div
            key={index}
            className="event"
            data-index={index}
            data-month={event.title}
            onClick={() => pipeHandler(index)}
          >
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;