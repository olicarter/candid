import { Fragment } from 'react'
import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { cn } from '@/lib/utils'
import styles from './values-card.module.css'

const data = [
  {
    name: 'Communication',
    you: 10,
    company: 8,
  },
  {
    name: 'Problem Solving',
    you: 9,
    company: 8,
  },
  {
    name: 'Teamwork',
    you: 7,
    company: 7,
  },
  {
    name: 'Adaptability',
    you: 6,
    company: 7,
  },
  {
    name: 'Creativity',
    you: 6,
    company: 5,
  },
]

export function ValuesCard() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Values</Card.Title>
        <Card.Description>Your alignment with company values.</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className={styles.chart}>
          <ul className={styles.legend}>
            <li className={styles.legendItem}>
              <div className={styles.bar} />
              <label className={styles.legendLabel}>You</label>
            </li>
            <li className={styles.legendItem}>
              <div className={cn(styles.bar, styles.company)} />
              <label className={styles.legendLabel}>Company Average</label>
            </li>
          </ul>
          <Form.Root>
            {data.map(value => (
              <Fragment key={value.name}>
                <Form.Label className={styles.valueLabel}>
                  {value.name}
                </Form.Label>
                <div className={styles.valueBars}>
                  <div
                    className={styles.bar}
                    style={{ width: value.you * 10 + '%' }}
                  />
                  <div
                    className={cn(styles.bar, styles.company)}
                    style={{ width: value.company * 10 + '%' }}
                  />
                </div>
              </Fragment>
            ))}
          </Form.Root>
        </div>
      </Card.Content>
    </Card.Root>
  )
}
