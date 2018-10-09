import { Grid, Cell, TextField, Button } from 'preact-fluid'

export default ({ inputs, actions }) =>
  <Grid columns={1}>
    {
      inputs.map(({ label, type, value, disabled, onChange, errorMsg }) =>
        <Cell middle>
          <TextField
            grid={{
              columns: 1,
              rows: 1
            }}
            hideLabel
            effect='border'
            placeholder={label}
            value={value}
            type={type}
            disabled={disabled}
            errorText={errorMsg}
            onChange={onChange} />
        </Cell>
      )
    }
    {
      actions.map(({ label, onClick, loading, disabled, primary, secondary }) =>
        <Cell middle>
          <Button
            onClick={onClick}
            primary={primary}
            secondary={secondary}
            loading={loading}
            disabled={disabled}>
            {label}
          </Button>
        </Cell>
      )
    }
  </Grid>
