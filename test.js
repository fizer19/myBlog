var killer = (target = {
  y: 2,
  z: 3
})
target.x = target = 1

console.log(killer.x < killer.y < killer.z)
console.log(target.x < target.y < target.z)