import React, { useState } from 'react';
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import { ExpandMore, Delete } from '@material-ui/icons'
import moment from 'moment';

export const Expense = ({ amount, restaurantName, date, userName, onDelete }) => {

  const [toDelete, setToDelete] = useState(false)

  return (
    <div onClick={() => onDelete && setToDelete(true)} style={{ marginBottom: 10, position: 'relative' }}>
      <ExpenseValue title='Gasto' value={`$${amount}`} />
      <ExpenseValue title='Restaurant' value={restaurantName} />
      {userName && <ExpenseValue title='Usuario' value={userName} />}
      <ExpenseValue title='Dia' value={moment(date).format('DD')} />
      {toDelete && <div onClick={onDelete} style={deleteOverlayStyle}><Delete /></div>}
    </div>
  )
}

const Expenses = ({ title, value, expenses, renderExpense }) =>
  <ExpansionPanel style={{ marginBottom: 15 }}>
    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography style={{ position: 'relative', left: -12 }} variant='caption'>{title}</Typography>
        <Typography style={{ fontSize: '1rem' }} variant='h6' align='right'>{value}</Typography>
      </div>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <div style={{ width: '100%' }}>
        {Object.entries(groupByDay(expenses)).map(([day, expenses]) =>
          <ExpensesGroup
            day={day}
            expenses={expenses}
            renderExpense={renderExpense}
          />)}
      </div>
    </ExpansionPanelDetails>
  </ExpansionPanel>

export default Expenses

const groupByDay = expenses =>
  expenses.reduce((acc, next) => {
    const date = moment(next.date).format('DD-MM-YYYY')
    if (acc[date] === undefined) acc[date] = []
    acc[date].push(next)
    return acc
  }, {})

const ExpensesGroup = ({ day, expenses, renderExpense }) =>
  <div>
    <Typography><b>{day}</b></Typography>
    <hr />{expenses.map(renderExpense)}<hr />
  </div>

const deleteOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: -5,
  padding: '0 5px',
  backgroundColor: '#ffffffba',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const ExpenseValue = ({ title, value }) =>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography>{title}</Typography>
    <Typography>{value}</Typography>
  </div>