export default class ClearMaskPass {
  enabled = true;
  render(renderer, writeBuffer, readBuffer, delta) {
    var context = renderer.context
    context.disable(context.STENCIL_TEST)
  }
}
