export default palette => Sprite.compose(0, 0, async ctx =>
  
  Promise.resolve(palette.bone.at(0, 2))
    .then(_=>_.flipped())
    .then(_=>_.draw(ctx, 20, 64));
  Promise.resolve(palette.bone.at(0, 2))
    .then(_=>_.draw(ctx, 44, 64));
  ctx.globalCompositeOperation = 'source-atop';
  Promise.resolve(palette.flesh.at(at, 0))
    .then(_=>_.draw(ctx, 32, 40));
  ctx.globalCompositeOperation = 'screen';
  Promise.resolve(palette.flesh.at(1, 2))
    .then(_=>_.faded(0.3))
    .then(_=>_.draw(ctx, 32, 0));
  Promise.resolve(palette.flesh.at(1, 2))
    .then(_=>_.faded(0.3))
    .then(_=>_.draw(ctx, 36, 6));
  Promise.resolve(palette.flesh.at(1, 2))
    .then(_=>_.faded(0.3))
    .then(_=>_.draw(ctx, 30, 4));
  Promise.resolve(palette.flesh.at(1, 2))
    .then(_=>_.faded(0.3))
    .then(_=>_.draw(ctx, 28, 8));
  Promise.resolve(palette.bone.at(1, 2))
    .then(_=>_.draw(ctx, 32, 0));
})