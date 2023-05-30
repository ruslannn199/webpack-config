import './styles/index.scss';

const obj = {
  one: {
    two: {
      three: 'awooooooo',
    }
  }
}

function woof(noise: string) {
  console.log(noise);
}

woof(obj.one.two.three);
