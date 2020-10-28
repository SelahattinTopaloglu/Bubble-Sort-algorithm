function onContentLoaded() {
  renderArray();
  initializeAlgorithm();
}

function renderArray() {
  const input = [];
  randomize(input);
  for(var i = 0; i < 10; i++){
    input[i] = prompt("Sıralamak istediğiniz 10 sayıdan " + i + ". elemanını giriniz: ");
  }
  
  const arrayNode = document.querySelector('.array');
  for (const int of input) {
    const node = document.createElement('div');
    setClass(node);
    node.innerText = int;
    arrayNode.appendChild(node);
  }
}

async function initializeAlgorithm() {
  const cells = document.getElementsByClassName('cell');
  let i = 0;
  let j = cells.length - 1;
  const interval = setInterval(() => {
    if (i === j) {
      if (j <= 1) {
        setTimeout(function() {
          for (const node of cells) {
            setClass(node, 'referenced');
          }
          setReplayButton();
        }, 500);
        return clearInterval(interval);
      }
      j--;
      i = 0;
    }
    let ref = cells.item(i);
    let compared = cells.item(i+1);
    
    setClass(ref, 'referenced')
    setClass(compared, 'compared')
    if (isGreater(ref, compared)) {
      setClass(ref, 'referenced m-right');
      setClass(compared, 'compared m-left');
      window.setTimeout(function () {
        setClass(ref);
        setClass(compared);
        const temp = ref.innerText;
        ref.innerText = compared.innerText;
        compared.innerText = temp;
        i++;
        if (i === j) setClass(cells.item(j), 'done')
      }, 900);
    } else {
      window.setTimeout(function() {
        i++;
        if (i === j) {
          if (cells.item(j) === ref) {
            setClass(ref, 'done');
            setClass(compared);
          } else {
            setClass(compared, 'done');
            setClass(ref);
          }
        } else {
          setClass(ref);
          setClass(compared)
        }
      }, 900);
    }
  }, 1000);
}

function isGreater(nodeA, nodeB) {
  const intA = Number(nodeA.innerText);
  const intB = Number(nodeB.innerText);
  return intA > intB;
}

function setClass(node, classname) {
  if (!classname) return node.setAttribute('class', 'cell');
  node.setAttribute('class', 'cell ' + classname);
}

function randomize(input) {
  for (let i = 0; i < input.length; i++) {
    input[i] = _.random(10, 99);
  }
}

function setReplayButton() {
  const header = document.querySelector('.header');
  const replay = document.createElement('button');
  replay.setAttribute('class', 'replay');
  replay.innerText = 'Random Sayılarla Baştan Sırala';
  replay.addEventListener('click', function(event) {
    resetArray();
    initializeAlgorithm();
    header.removeChild(replay);
  });
  
  header.appendChild(replay);
  console.log(header)
}

function resetArray() {
  const array = document.querySelector('.array');
  for (let node of array.children) {
    node.innerText = _.random(10, 99);
    setClass(node);
  }
  
}

document.addEventListener('DOMContentLoaded', onContentLoaded);