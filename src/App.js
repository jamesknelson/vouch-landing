import React, { useState } from 'react';
import ResetCSS  from './reset.css'
import styled, { css } from 'styled-components/macro'
import { functions } from './backend'
import { LoadingBar } from './loading'
import logo from './media/logo.svg'
import vouch from './media/vouch.svg'
import { colors, focusRing } from './theme'

const Card = styled.div`
  background-color: ${colors.structure.bg};
  border: 1px solid ${colors.structure.border};
  border-radius: 8px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.01), 0 0 2px 0px rgba(0, 0, 0, 0.02);
  margin: 4rem auto;
  max-width: 360px;
  padding: 1rem 3rem;
  position: relative;
`

const P = styled.p`
  color: ${colors.text.tertiary};
  font-size: 0.9rem;
  line-height: 1.2rem;
  margin: 1.5rem 0;
  text-align: center;
`

const StyledIssue = styled.p`
  color: ${colors.text.error};
  margin-top: 0.75rem;
  text-align: center;
`

const StyledLabel = styled.label`
  color: ${colors.ink.mid};
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 0.5rem;
`

const StyledInputOutline = styled.div``

const StyledInput = styled.input`
  border: 1px solid ${colors.control.border.default};
  border-radius: 4px;
  display: block;
  font-size: 1rem;
  padding: 0.5rem;
  width: 100%;

  ${focusRing(` + ${StyledInputOutline}`)}
`

const StyledInputWrapper = styled.div`
  position: relative;
`

const Input = props =>
  <StyledInputWrapper>
    <StyledInput {...props} />
    <StyledInputOutline />
  </StyledInputWrapper>

const StyledButton = styled.button`
  border-radius: 9999px;
  background-color: ${colors.ink.black};
  color: ${colors.text.light};
  cursor: pointer;
  font-size: 1rem;
  margin: 1rem 0;
  padding: 0.5rem;
  position: relative;
  width: 100%;

  ${props => props.disabled && css`
    opacity: 0.5;
  `}

  ${focusRing('::after', { radius: '9999px' })}
`

const joinMailingList = functions.httpsCallable('joinMailingList')

function validate({ name, email }) {
  let issues = {}
  if (!name) {
    issues.name = 'Who are you, though?'
  }
  if (!email) {
    issues.email = "You'll need an email to join the list."
  }
  if (!/.+@.+/.test(email)) {
    issues.email = "That email address doesn't look quite right."
  }
  return Object.keys(issues).length === 0 ? null : issues
}

function App() {
  let [{ status, issues }, setJoinState] = useState({
    status: 'fresh',
    issues: null,
  })
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')

  let isSubmitting = status === 'submitting'
  let isDone = status === 'done'

  const handleSubmit = async (event) => {
    event.preventDefault()

    let issues = validate({ name, email })
    if (issues) {
      setJoinState({
        status: 'invalid',
        issues,
      })
      return
    }

    setJoinState({
      issues: null,
      status: 'submitting'
    })

    try {
      let { data } = await joinMailingList({ name, email })
      if (data.status === 'success') {
        setJoinState({
          issues: null,
          status: 'done'
        })
        return
      }
    }
    catch (error) {}

    setJoinState({
      issues: {
        error: 'Something went wrong.'
      },
      status: 'error',
    })
  }

  const handleChangeName = (event) => {
    setName(event.target.value)
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  let content
  if (isDone) {
    content = 
      <P>
        Thanks for joining in!
        <br />
        When we're ready to wow you,
        <br />
        You'll get an email.
      </P>
  }
  else {
    content = (
      <>
        <P>
          A social network, <br />
          Where you are the customer. <br />
          Ad free. Launching soon.
        </P>
        <form onSubmit={handleSubmit}>
          <StyledLabel>
            Your name
            <Input type="text" value={name} onChange={handleChangeName} />
          </StyledLabel>
          <StyledLabel>
            Your email
            <Input type="email" value={email} onChange={handleChangeEmail} />
          </StyledLabel>
          {issues &&
            <StyledIssue>
              {Object.values(issues)[0]}
            </StyledIssue>
          }
          <StyledButton
            disabled={isSubmitting}
            type="submit">
            I'll vouch for that
          </StyledButton>
        </form>
      </>
    )
  }

  return (
    <div css={css`
      padding: 0 1rem;
    `}>
    <ResetCSS />
    <Card>
    <LoadingBar active={isSubmitting} css={css`
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    `} />
    <div css={css`text-align: center;`}>
      <img src={logo} alt="Logo" css={css`
        display: block;
        margin: 0 auto;
        margin-bottom: 0.75rem;
        margin-top: 1rem;
        width: 2rem;
      `} />
      <img src={vouch} alt="Vouch" css={css`
        height: 1rem;
      `} />
      </div>
      {content}
    </Card>
    </div>
  );
}

export default App;
