var birdPreset = [{
  size: 61,
  dimension: 3840,
  cellNum: 8,
  pageNum: 2,
  anchor: 1184 / 1920,
  spriteArr: [{
    idx: 0,
    name: 'Walk A',
    states: [0, 1],
    dur: 12,
    start: 0,
    flip: false,
    seq: true,
    velocity: [220, 0, 11],
    chance: 10
  }, {
    idx: 1,
    name: 'Walk B',
    states: [1, 0],
    dur: 12,
    start: 12,
    flip: false,
    seq: true,
    velocity: [220, 0, 11],
    chance: 10
  }, {
    idx: 2,
    name: 'Catch',
    states: [1, 0],
    dur: 24,
    start: 24,
    flip: false,
    seq: true,
    velocity: [720, 0, 9],
    chance: 5
  }, {
    idx: 3,
    name: 'Flip',
    states: [1, 1],
    dur: 12,
    start: 48,
    flip: true,
    seq: true,
    chance: 2
  }, {
    idx: 4,
    name: 'Bow 1A',
    states: [1, 3],
    dur: 6,
    start: 60,
    flip: false,
    seq: true,
    chance: 5
  }, {
    idx: 5,
    name: 'Bow 1B',
    states: [3, 1],
    dur: 6,
    start: 66,
    flip: false,
    seq: true,
    chance: 2
  }, {
    idx: 6,
    name: 'Bow 0A',
    states: [0, 2],
    dur: 6,
    start: 72,
    flip: false,
    seq: true,
    chance: 5
  }, {
    idx: 7,
    name: 'Bow 0B',
    states: [2, 0],
    dur: 6,
    start: 78,
    flip: false,
    seq: true,
    chance: 2
  }, {
    idx: 8,
    name: 'Extend 1A',
    states: [1, 5],
    dur: 6,
    start: 84,
    flip: false,
    seq: true,
    chance: 5
  }, {
    idx: 9,
    name: 'Extend 1B',
    states: [5, 1],
    dur: 6,
    start: 90,
    flip: false,
    seq: true,
    chance: 2
  }, {
    idx: 10,
    name: 'Extend 0A',
    states: [0, 4],
    dur: 6,
    start: 96,
    flip: false,
    seq: true,
    chance: 5
  }, {
    idx: 11,
    name: 'Extend 0B',
    states: [4, 0],
    dur: 6,
    start: 102,
    flip: false,
    seq: true,
    chance: 2
  }, {
    idx: 12,
    name: 'State 0',
    state: 0,
    start: 0,
    seq: false,
    chance: 5
  }, {
    idx: 13,
    name: 'State 1',
    state: 1,
    start: 24,
    seq: false,
    chance: 5
  }, {
    idx: 14,
    name: 'State 2',
    state: 2,
    start: 78,
    seq: false,
    chance: 5
  }, {
    idx: 15,
    name: 'State 3',
    state: 3,
    start: 66,
    seq: false,
    chance: 3
  }, {
    idx: 16,
    name: 'State 4',
    state: 4,
    start: 102,
    seq: false,
    chance: 8
  }, {
    idx: 17,
    name: 'State 5',
    state: 5,
    start: 90,
    seq: false,
    chance: 10
  }]
}]