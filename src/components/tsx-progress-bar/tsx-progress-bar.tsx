import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'tsx-progress-bar',
  styleUrl: 'tsx-progress-bar.scss'
})
export class TsxProgressBarComponent {

  // Indicate that name should be a public property on the component
  @Prop() name: string;

  render() {
    return (
      <p>
        My name is {this.name}
      </p>
    );
  }
}