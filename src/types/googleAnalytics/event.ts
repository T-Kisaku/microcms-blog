interface ContactEvent {
    action: 'submit_form'
    category: 'contact'
    label: string
  }
  
  interface ClickEvent {
    action: 'click'
    category: 'other'
    label: string
  }
  
  export type Event = ContactEvent | ClickEvent
  