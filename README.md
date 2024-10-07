# Custom Nav Buttons FSC (Flow Screen Component)

This component can be dropped onto any flow to define custom navigation buttons.  When one of the buttons is clicked an output variable in the component is assigned the defined action and the Next navigation event happens.  You can then use a Decision node to direct to the appropriate section of the flow based on the action.

Groups of buttons can be defined on any/all of the left, centre or right side.  The format for each is:

"Label|Value[|Variant|Icon|Icon Position], Label|Value[|Variant|Icon|Icon Position],..."

For example, to create a delete button on the right side of the screen, you could use:

Delete|delete|destructive|utility:delete|right

And then have a Decision element in the next node of the flow with an outcome of Delete and criteria if (button).action EQUALs delete.