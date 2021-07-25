import React from 'react'

function createStyles<T extends Record<string, React.CSSProperties>>(
  styles: T
): T {
  return styles
}

export const thickness = 40

export const color = {
  backL: '#1C242D',
  back: '#181E26',
  backD: '#12171D',
  secondary: '#567091',
  secondaryL: '#29394e',
  secondaryLL: 'rgba(41,57,78,0.3)',
  primary: '#60cbff',
}

export const size = createStyles({
  full: {
    height: '100%',
    width: '100%',
  },
})

export const flex = createStyles({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  around: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  between: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnBetween: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export const styles = createStyles({
  container: {
    color: '#fff',
    height: 600,
    width: 1000,
  },
  tabBar: {
    background: color.backL,
    ...size.full,
    ...flex.columnBetween,
  },
  tabTitle: {
    height: thickness * 0.8,
    width: thickness,
    ...flex.between,
    background: color.secondaryLL,
    marginBottom: 6,
  },
  tabTitleOn: {
    height: thickness * 0.8,
    width: thickness,
    ...flex.between,
    background: color.secondaryL,
    marginBottom: 6,
  },
  pane: {
    background: color.back,
    ...size.full,
    ...flex.center,
  },
  closeButton: {
    height: thickness * 1.5,
    width: thickness,
    color: color.secondary,
    fontSize: 35,
    cursor: 'pointer',
    ...flex.center,
  },
})
