import React from 'react'

class FlexibleContent extends React.Component {
  render() {
    const { rows, components, meta } = this.props
    if (!!rows || !!components) {
      return rows.map(({ __typename: typename, ...data }, index) => {
        const type = typename.replace('WordPressAcf_', '')
        const Component = components[type]
        return !!Component ? (
          <Component key={index} {...data} {...meta} />
        ) : (
          console.warn(`No component found for ${type} type`)
        )
      })
    } else {
      return null
    }
  }
}

export default FlexibleContent
