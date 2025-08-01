Specimen Analysis: Simple Computer Emulator

This emulator represents a very rudimentary virtual machine, demonstrating how a computer processes instructions and manages data at a low level.

    Architecture: It simulates a basic CPU with a set of general-purpose registers (A, B, C, D) and a small, addressable memory space (256 bytes).

    Instruction Set: It understands a very limited instruction set for fundamental operations:

        MOV <register>, <value>: Moves an immediate value into a specified <register>.

        ADD <register>, <value>: Adds an immediate value to the current content of a specified <register>.

        SUB <register>, <value>: Subtracts an immediate value from the current content of a specified <register>.

        OUT <register>: Outputs the current value of a specified <register> to the display.

    Input/Output: Instructions are provided via a text area, and results are shown in an output display. The memory and register states are also visualized.

    Web-based: It's entirely built using web technologies (HTML for structure, CSS for styling, and JavaScript for logic), making it runnable directly in any modern browser.

HTML (index.html):

This sets up the visual layout with sections for inputting code, displaying memory, registers, and output.
How to use it:

    Save the entire code block above as an index.html file.

    Open the index.html file in any modern web browser.

    You will see the "Simple Computer Emulator" interface.

    The Code Editor textarea contains a sample program:

    MOV A,5
    ADD A,3
    OUT A
    MOV B,10
    SUB B,2
    OUT B

    Click the "Run Program" button to execute the code.

    The Registers, Memory, and Output sections will update to show the state of the emulator and the program's output.

You can modify the code in the Code Editor textarea to write your own simple programs using the MOV, ADD, SUB, and OUT instructions, and then run them to see the results. This gives you a tangible "computer specimen" that you can directly interact with and observe.
