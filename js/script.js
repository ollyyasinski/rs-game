class AttackQuestions{
  constructor(){
    this.rules = `Read the tasks carefully!\nYour answer may be:\n  1. number (1, 2.1)\n  2. string (more than one word is possible)\n  3. boolean (true/false)\n  4. array ([1,2,3], [[1,2],[3,4]])\nThere is not case sensitivity\nError is possible answer`;
  }
  javaScript(){
    let arr = [
      [`console.log(NaN == NaN);\nThe output will be:`, 'false'],
      [`function test(){\n  console.log(a);\n  var a = 2;\n}\ntest();\nThe output will be:`, 'undefined'],
      [`var c = {};\nvar d = {};\nconslole.log(c === d);\nThe output will be:`, 'false'],
      [`console.log(0 ? "truthy" : "falsy");\nThe output will be:`, 'falsy'],
      [`(function(){\n  console.log(typeof arguments);\n})();\nThe output will be:`, 'object'],
      [`(function(x){\n  delete x;\n  console.log (x);\n})(1);\nThe output will be:`, '1'],
      [`console.log('b'+'a' + + 'a');\nThe output will be:`, 'banan'],
      [`function f(){ return f; }\nconsole.log(new f() instanceof f);\nThe output will be:`, 'false'],
      [`var y = 1, x = y = typeof x;\nconsole.log(x);\nThe output will be:`, 'undefined'],
      [`let a = [1,2]\n(function() { alert(a) })()\nThe output will be:`, 'error']
    ];
    return arr;
  }
  css(){
    let arr = [
      [`body{\n  width: 500px;\n  padding: 15px;\n}\nThe width will be:`, '530'],
      [`body{\n  width: 500px;\n  margin: 15px;\n}\nThe width will be:`, '500'],
      [`div.first{\n  position: absolute;\n}\n\ndiv.second{\n  position: absolute;\n}\nWhich div we will see:`, 'second'],
      [`div{\n  background-color: red;\n  background-color: yellow;\n}\nWhat color will be:`, 'yellow'],
      [`div{\n  color: white;\n  background-color: red;\n  background-color: yellow;\n  color: pink;\n}\nWhat color the text is:`, 'pink'],
      [`body{\n  width: 500px;\n  outline: 15px solid red;\n}\nThe width will be:`, '500'],
      [`body{\n  width: 500px;\n  border: 15px solid red;\n}\nThe width will be:`, '530'],
      [`div{\n  width: 0;\n  height: 0;\n  border-left: 150px solid transparent;\n  border-right: 150px solid transparent;\n  border-top: 150px solid blue;\n}\nWhat the block will look like:`, 'triangle'],
      [`table{\n  border-collapse: separate;\n  border-spacing: 10px 20px;\n}\nHow many px will be between the columns:`, '10'],
      [`table{\n  border-collapse: separate;\n  border-spacing: 10px 20px;\n}\nHow many px will be between the rows:`, '20']
    ];
    return arr;
  }
  html(){
    let arr = [
      [`<table>\n  <tr>\n    <th>X</th><th>X</th><th>X</th>\n  </tr>\n  <tr>\n    <th>X</th>\n  </tr>\n  <tr>\n    <th>X</th><th>X</th>\n  </tr>\n</table>\nHow many cells will be in the table:`, '6'],
      [`<table>\n  <tr>\n    <th>X</th><th>X</th><th>X</th>\n  </tr>\n  <tr>\n    <th>X</th>\n  </tr>\n  <tr>\n    <th>X</th><th>X</th>\n  </tr>\n</table>\nHow many cells the second tr occupies:`, '3'],
      [`<form>\n  <label for="input">First</label>\n  <input type="text" name="input" id="inp">\n  <label for="inp">Second</label>\n</form>\nWhich label will be associated with input:`, 'second'],
      [`<form name="form">\n  <label for="form">First</label>\n  <label>Second\n    <input type="text" name="input">\n  </label>\n  <label for="input">Third</label>\n</form>\nWhich label will be associated with input:`, 'second'],
      [`<button name="Button">Name</button>\nWhat will be written on the button:`, 'name'],
      [`<button value="Button">Name</button>\nWhat will be written on the button:`, 'name'],
      [`<input type="button" value="Click" name="Button">\nWhat will be written on the button:`, 'click'],
      [`<input type="button" value="Click">Button\nWhat will be written on the button:`, 'click'],
      [`<blockquote cite="Mummy">Text<cite>Daddy</cite></blockquote>\nWhich author will be listed on the page:`, 'daddy'],
      [`<input type="radio" name="test" id="First" checked>\n<input type="radio" name="test" id="Second" checked>\nWhich input will be checked default:`, 'second']
    ];
    return arr;
  }
  c(){
    let arr = [
      [`void print(int v)\n   {\n     std::cout << v << std::endl;\n  }\nvoid print(bool v)\n  {\n    std::cout << v << std::endl;\n  }\n\nint main()\n  {\n    print(1);\n  }\nThe output will be:`, '1'],
      [`void print(int v)\n   {\n     std::cout << v << std::endl;\n  }\nvoid print(bool v)\n  {\n    std::cout << v << std::endl;\n  }\n\nint main()\n  {\n    print(true);\n  }\nThe output will be:`, '1'],
      [`void print(int v)\n   {\n     std::cout << v << std::endl;\n  }\nvoid print(bool v)\n  {\n    std::cout << v << std::endl;\n  }\n\nint main()\n  {\n    print("Hello world");\n  }\nThe output will be:`, '1'],
      [`void print(int v)\n   {\n     std::cout << v << std::endl;\n  }\n\nint main()\n  {\n    print("Hello world");\n  }\nThe output will be:`, 'error'],
      [`int main()\n  {\n    for (int i = 0; i < 4; ++i)\n    {\n      switch (i)\n        {\n          case 0  : std::cout << "0";\n          case 1  : std::cout << "1"; continue;\n          case 2  : std::cout << "2"; break;\n          default : std::cout << "D"; break;\n        }\n        std::cout << ".";\n    }\n    return 0;\n  }\nThe output will be:`, '0112.D.'],
      [`int main()\n  {\n    for (int i = 0; i < 4; ++i)\n    {\n      switch (i)\n        {\n          case 0  : std::cout << "0";\n          case 1  : std::cout << "1"; continue;\n          case 2  : std::cout << "2";\n          default : std::cout << "D"; break;\n        }\n        std::cout << ".";\n    }\n    return 0;\n  }\nThe output will be:`, '0112D.D.'],
      [`int main()\n  {\n    for (int i = 0; i < 4; ++i)\n    {\n      switch (i)\n        {\n          case 0  : std::cout << "0";\n          case 1  : std::cout << "1";\n          case 2  : std::cout << "2";\n          default : std::cout << "D"; break;\n        }\n        std::cout << ".";\n    }\n    return 0;\n  }\nThe output will be:`, '012D.12D.2D.D.'],
      [`int main()\n  {\n    int x = 0;\n    switch(x)\n      {\n        case 1: cout << "Lan";\n        case 0: cout << "Ban";\n        case 2: cout << "An";\n      }\n  }\nThe output will be:`, 'banan'],
      [`int main()\n  {\n    int x = 1;\n    switch(x)\n      {\n        case 1: cout << "Lan";\n        case 0: cout << "Ban";\n        case 2: cout << "An";\n      }\n  }\nThe output will be:`, 'lanbanan'],
      [`int main()\n  {\n    int x = 1;\n    switch(x)\n      {\n        case 1: cout << "Lan";\n        case 0: cout << "Ban"; break;\n        case 2: cout << "An";\n      }\n  }\nThe output will be:`, 'lanban']
    ];
    return arr;
  }
  java(){
    let arr = [
      [`Float f1 = new Float(Float.NaN);\nFloat f2 = new Float(Float.NaN);\nSystem.out.println(f1 == f2);\nThe output will be:`, 'false'],
      [`Float f1 = new Float(Float.NaN);\nFloat f2 = new Float(Float.NaN);\nSystem.out.println(f1.equals(f2));\nThe output will be:`, 'true'],
      [`System.out.println(Float.NaN == Float.NaN);\nThe output will be:`, 'false'],
      [`Integer a = 120;\nInteger b = 120;\nInteger c = 130;\nInteger d = 130;\nSystem.out.println(a == b);\nThe output will be:`, 'true'],
      [`Integer a = 120;\nInteger b = 120;\nInteger c = 130;\nInteger d = 130;\nSystem.out.println(c == d);\nThe output will be:`, 'false'],
      [`public static void main(String [] args)\n  {\n    String s = "ONE"+3+2+"TWO";\n    System.out.println(s);\n  }\nThe output will be:`, 'one32two'],
      [`public class Main {\n  public static void main(String[] args) {\n    System.out.println(args.length);\n  }\n}\nThe output will be:`, '0'],
      [`int i = 0;\nSystem.out.print(++i);\nSystem.out.print(i++);\nSystem.out.print(i);\nThe output will be:`, '112'],
      [`int[][] array = {{1, 2, 3}, {0, 0, 0,},};\nSystem.out.println(Arrays.deepToString(array));\nThe output will be:`, '[[1,2,3],[0,0,0]]'],
      [`long year = 201l;\nSystem.out.print(year);\nThe output will be:`, '201']
    ];
    return arr;
  }
  php(){
    let arr = [
      [`$numeric = 42;\n$type = gettype(gettype($numeric + 0.0));\necho $type;\nThe output will be:`, 'string'],
      [`$a = 11;\n$b = 22;\n$c = 33;\necho $b = $a = $c;\nThe output will be:`, '33'],
      [`$state = array ("Karnataka", "Goa", "Tamil Nadu","Andhra Pradesh");\necho (array_search ("Tamil Nadu", $state) );\nThe output will be:`, '2'],
      [`$fruits = array('apple', 0, 'banana', 1, 'orange');\nfor each ($fruits as $fruit) {\n  echo $fruit;\n}\nThe output will be:`, 'error'],
      [`echo 'Hello';\nif (false)\n  echo "PHP "; echo " Friend";\necho "!";\nThe output will be:`, 'hello friend!'],
      [`echo 'Hello';\nif (false){\n  echo "PHP "; echo " Friend";\n}\necho "!";\nThe output will be:`, 'hello!'],
      [`$string = 'PHP';\nif (print 'PHP' == (100-99)) {\n  echo 'B';\n} else if (print 'PHP' == $string) {\n  echo 'A';\n} else {\n  echo 'C';\n};\nThe output will be:`, 'b'],
      [`echo "Результат: " . 2 + 2;\nThe output will be:`, '2'],
      [`function some(){\n  return 1;\n  return 2;\n  return 3;\n}\necho some();\nThe output will be:`, '1'],
      [`abstract class ololo{\n  static function dontDoIt(){\n    print "wow";\n  }\n  abstract function doIt();\n}\nololo::dontDoIt();\nThe output will be:`, 'wow']
    ];
    return arr;
  }
  ruby(){
    let arr = [
      [`a = [ "d", "a", "e", "c", "b" ]\nputs a.sort {|x,y| y <=> x }\nThe output will be:`, 'edcba'],
      [`arr = [1, -2, 5, -4]\np (0..arr.size-2).all?{ |x| (arr[x] * arr[x+1]) < 0 }\nThe output will be:`, 'true'],
      [`arr = [5, 1, -2, 5, -4]\np (0..arr.size-2).all?{ |x| (arr[x] * arr[x+1]) < 0 }\nThe output will be:`, 'false'],
      [`arr = [1, 2, 3, 4, 5]\nab = (3..5)\np arr&ab.to_a\nThe output will be:`, '[3,4,5]'],
      [`arr = [5, 7, 3, 4, 6]\nab = (0..2)\np arr&ab.to_a\nThe output will be:`, '[]'],
      [`a = [1, 2, 3, 4, 5, 6, 7, 8]\np a.reject{ |i| i.even? }.max\nThe output will be:`, '7'],
      [`str = "acBdeFg"\na=str.scan(/[a-z]/)\np a==a.sort\nThe output will be:`, 'true'],
      [`str = "dog cat duck"\np str.split.size\nThe output will be:`, '3'],
      [`n=321\nm1=n.to_s.split(//)\np m1==m1.sort.reverse\nThe output will be:`, 'true'],
      [`n=1544\nm=n.to_s.split(//)\np m.uniq==m\nThe output will be:`, 'false']
    ];
    return arr;
  }
  python(){
    let arr = [
      [`print(type(1 / 2))\nThe class will be:`, 'float'],
      [`print(type(2 / 1))\nThe class will be:`, 'float'],
      [`kvps  = {"user","bill", "password","hillary"}\nprint(kvps['password'])\nThe output will be:`, 'error'],
      [`x = 4.5\ny = 2\nprint(x // y)`, '2.0'],
      [`a = [1,2,3,None,(),[],]\nprint(len(a))\nThe output will be:`, '6'],
      [`name = "snow storm"\nprint("%s" % name[6:8])\nThe output will be:`, 'to'],
      [`print((0 < 5 <= 3) and (0 / 0))\nThe output will be:`, 'false'],
      [`def summ(arg1, arg2):\n  return arg1 + arg2\nnum = 1, 2\nprint (summ(num))\nThe output will be:`, 'error'],
      [`print ("{0:*^15}".format(1234567))\nThe output will be:`, '****1234567****'],
      [`a, b = 0, 1\nwhile b < 5:\n  print(b, end = '')\n  a, b = b, a + b\nThe output will be:`, '1123']
    ];
    return arr;
  }
}

class ShieldQuestions{
  constructor(){
    this.rules = `Write the name of the function/keyword/other.\nDon't use () for functions!\nUse the following characters:\n  1. <>\n  2. :\n  3. -`;
  }
  javaScript(){
    let arr = [
      [`The method used to remove the last element from an array and return that element.`, 'pop'],
      [`The static method used to define a new property directly on an object, or modifie an existing property on an object, and return the object.`, 'defineproperty'],
      [`The method used to return a string representing the object.`, 'tostring'],
      [`The method used to return a string with a language sensitive representation of this number.`, 'tolocalestring'],
      [`The method used to call a function with a given this value and arguments provided individually.`, 'call'],
      [`The method used to return the time portion of a Date object in human readable form in American English.`, 'totimestring'],
      [`The method used to return the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.`, 'now'],
      [`The method used to add one or more elements to the beginning of an array and return the new length of the array.`, 'unshift'],
      [`The method used to create a new array with the results of calling a provided function on every element in the calling array.`, 'map'],
      [`The method used to merge two or more arrays.`, 'concat']
    ];
    return arr;
  }
  css(){
    let arr = [
      [`The property used to align flex items of the current flex line in the perpendicular direction.`, 'align-items'],
      [`The pseudo-class used to match elements based on their position in a group of siblings.`, ':nth-child'],
      [`The property letting you round the corners of an element's outer border edge.`, 'border-radius'],
      [`The property which can show or hide an element without affecting the layout of a document`, 'visibility'],
      [`The property defining the type of rendering box used for an element.`, 'display'],
      [`The property specifying that an element should be placed along the left or right side of its container, allowing text and inline elements to wrap around it.`, 'float'],
      [`The pseudo-class representing any <input> or other <form> element whose contents fail to validate.`, ':invalid'],
      [`The property specifying the appearance of decorative lines used on text.`, 'text-decoration'],
      [`The property specifying under what circumstances (if any) a particular graphic element can become the target of mouse events.`, 'pointer-events'],
      [`The property specifying what to do when an element's content is too large to fit in its block formatting context.`, 'overflow']
    ];
    return arr;
  }
  html(){
    let arr = [
      [`The element indicating that the enclosed HTML provides contact information for a person or people, or for an organization.`, '<address>'],
      [`The element representing introductory content, typically a group of introductory or navigational aids.`, '<header>'],
      [`The element  indicating that the enclosed text is an extended quotation.`, '<blockquote>'],
      [`The element representing the dominant content of the <body> of a document, portion of a document or application. `, '<main>'],
      [`The element defining a section of HTML to be inserted if a script type on the page is unsupported or if scripting is currently turned off in the browser.`, '<noscript>'],
      [`The element defining a set of rows defining the head of the columns of the table.`, '<thead>'],
      [`The element representing a document section that contains interactive controls for submitting information to a web server.`, '<form>'],
      [`The element representing a caption for an item in a user interface.`, '<label>'],
      [`The element representing a multi-line plain-text editing control.`, '<textarea>'],
      [`The element specifying a term in a description or definition list.`, '<dt>']
    ];
    return arr;
  }
  c(){
    let arr = [
      [`The keyword deallocating the space previously allocated by std::malloc(), std::calloc() or std::realloc().`, 'free'],
      [`The keyword allocating size bytes of uninitialized storage.`, 'malloc'],
      [`The function comparing two null-terminated byte strings lexicographically.`, 'strcmp'],
      [`The function calculating the product of the first and second specified arguments, and then adds the third specified argument.`, 'mad'],
      [`The function, determining the sign of the specified argument.`, 'sign'],
      [`The function which is not a member of the class, but has access to private and protected members of the class.`, 'friend'],
      [`The function comparing two values, returning 0 or 1 depending on which value is greater.`, 'step'],
      [`The function generating a random value by using the Perlin noise algorithm.`, 'noise'],
      [`A keyword indicating that the virtual member will receive a new cell in the vtable table.`, 'new'],
      [`Function determining the maximum numeric value of the arguments.`, 'umax']
    ];
    return arr;
  }
  java(){
    let arr = [
      [`The keyword for a method that returns nothing.`, 'void'],
      [`The numeric type for 16 bits.`, 'short'],
      [`The package for input and output operations.`, 'io'],
      [`The package for working with graphics and creating a GUI.`, 'awt'],
      [`The package with main utilities.`, 'util'],
      [`The package for cryptographic operations.`, 'crypto'],
      [`The method defining actions in moment before the object deleted by the garbage collector.`, 'finalize'],
      [`The keyword representing the current instance of the parent class.`, 'super'],
      [`The method checking whether two objects are equivalent.`, 'equals'],
      [`The keyword allowing you to check the assumptions about the values of arbitrary data at any place in the program.`, 'assert']
    ];
    return arr;
  }
  php(){
    let arr = [
      [`The function drawing an arc of a circle with given coordinates of the center.`, 'imagearc'],
      [`The function converting binary data to a hexadecimal representation.`, 'bin2hex'],
      [`The function returning a string length.`, 'strlen'],
      [`The function displaying information about the current configuration of PHP.`, 'phpinfo'],
      [`The function returning the type of a variable.`, 'gettype'],
      [`The function returning the number of array elements or object properties.`, 'count'],
      [`The function sorting the array by keys in the reverse order.`, 'krsort'],
      [`The function returning the absolute value of number.`, 'abs'],
      [`The function which uppercase the first character of each word in a string`, 'ucwords'],
      [`The function returning the height of the given image.`, 'imagesy']
    ];
    return arr;
  }
  ruby(){
    let arr = [
      [`The keyword removing a method definition.`, 'undef'],
      [`The method returning a new array without duplicate values.`, 'uniq'],
      [`The method adding elements to the beginning of an array.`, 'unshift'],
      [`The method choosing a random element (or elements) from the array.`, 'sample'],
      [`The method searching through the array whose elements are also arrays.`, 'rassoc'],
      [`The method invoking the given block once for each element of array.`, 'map'],
      [`The method returning the cube root of value.`, 'cbrt'],
      [`The function returning the number of array elements`, 'count'],
      [`The function returning a copy of array with all nil elements removed.`, 'compact'],
      [`The function removing all elements from array.`, 'clear']
    ];
    return arr;
  }
  python(){
    let arr = [
      [`The function generating arithmetic progressions.`, 'range'],
      [`The function returning an ordered list of names in a module`, 'dir'],
      [`The method checking whether an object belongs to a class or a subclass.`, 'isinstance'],
      [`The keyword for function declaration.`, 'def'],
      [`The keyword for declaring elementary functions`, 'lambda'],
      [`The method adding an element to the end of the list.`, 'append'],
      [`A keyword turning any function into a generator.`, 'yield'],
      [`The function returning the string length.`, 'len'],
      [`The function checking if the string consists of numbers.`, 'isdigit'],
      [`The function, converting a string to lowercase.`, 'lower']
    ];
    return arr;
  }
}

class HealQuestions{
  constructor(){
    this.rules = `Choose one of the options.`;
  }
  javaScript(){
    let arr = [
      [`Which event allows you to execute the code after clicking the mouse?`, ['mouseout', 'mouseclick', 'onmouseclick', 'onclick'], 'onclick'],
      [`Which constructions for cycles existe javascript?`, ['for, while', 'if, while, loop', 'for, while, do...while', 'do...while, for, while, if'], 'for, while, do...while'],
      [`Variable apple and Apple (with a capital letter) - is it the same or different?`, ['same', 'different', 'Variables can not be named with a capital letter.', 'The word "apple" is keyword and can\'t be used.'], 'different'],
      [`How to write a comment in JS?`, ['// I\'m a comment', '<!-- I\'m a comment -->', '<? I\'m a comment ?>', '* I\'m a comment *'], '// I\'m a comment'],
      [`Which special operator is not exist in JavaScript.`, ['delete', 'instanceof ', 'typeof', 'isset'], 'isset'],
      [`JavaScript is the part of Java, isn't it?`, ['yes', 'no', 'Java is the part of JavaScript', 'they are both part of ECMAScript'], 'no'],
      [`Which construction allows you to check code sections for errors?`, ['error..catch', 'try..catch', 'error..try', 'throw'], 'try..catch'],
      [`Which type of collection doesn't exist in JS?`, ['array', 'map', 'weakset', 'list'], 'list'],
      [`Which object is used to work with the date and time?`, ['datetime', 'calendar', 'time', 'date'], 'date'],
      [`Which data type is not exist in JS?`, ['number', 'undefined', 'function', 'symbol'], 'function']
    ];
    return arr;
  }
  css(){
    let arr = [
      [`Which option is not a valid value for the border-style property?`, ['dotted', 'inset', 'glazed', 'groove'], 'glazed'],
      [`Which option is not a valid length value?`, ['cm', 'em', 'mm', 'dm'], 'dm'],
      [`Which property doesn't affect the box model?`, ['margin', 'padding', 'outline', 'content'], 'outline'],
      [`How does CSS decrypted?`, ['Cascading Style Sheets', 'Common Style Sheets', 'Computer Style Sheets', 'Current Style Sheets'], 'Cascading Style Sheets'],
      [`Which pseudo-class is applied to the form field whose content doesn't match the specified type?`, [':activ', ':hover', ':valid', ':invalid'], ':invalid'],
      [`Which color name doesn't exist in CSS?`, ['cyan', 'golden', 'ivory', 'cornsilk'], 'golden'],
      [`Which selector allows you to access each element of a web page?`, ['all', '*', 'each', 'every'], '*'],
      [`Which property used to specify the gaps between table cells?`, ['border-collapse', 'border-grap', 'border-size', 'border-spacing'], 'border-spacing'],
      [`Which property used to specify the marker appearance of the list element?`, ['li-style', 'list-type', 'list-style-type', 'li-style-type'], 'list-style-type'],
      [`Which property doesn't exist in CSS?`, ['list-style-type', 'list-style-position', 'list-style-image', 'list-style-underline'], 'list-style-underline']
    ];
    return arr;
  }
  html(){
    let arr = [
      [`How does HTML decrypted?`, ['HyperThread Mask Language', 'HyperThread Markup Language', 'HyperText Mask Language', 'HyperText Markup Language'], 'Hypertext Markup Language'],
      [`Which <link> attribute contains the link address?`, ['url', 'src', 'href', 'address'], 'href'],
      [`Which attribute can't be contained in <p>?`, ['class', 'title', 'align', 'id'], 'title'],
      [`Which tag is used to name the document on the World Wide Web?`, ['meta', 'base', 'title', 'head'], 'title'],
      [`Which option is used to create items for selecting multiple options?`, ['<input type=radio>', '<input type=radiobox>', '<input type=check>', '<input type=checkbox>'], '<input type=checkbox>'],
      [`Which tag doesn't exist?`, ['<pre>', '<hr>', '<adress>', '<progress>'], '<adress>'],
      [`Which attribute can't be contained in <img>?`, ['longdesc', 'lowsrc', 'name', 'align'], 'name'],
      [`Which tag is not semantic?`, ['<main>', '<footer>', '<aside>', '<content>'], '<content>'],
      [`Which tag is used for citations?`, ['<figure>', '<blockquote>', '<quote>', '<summary>'], '<blockquote>'],
      [`Which tag is child for <! DOCTYPE>?`, ['<header>', '<body>', '<head>', '<html>'], '<html>']
    ];
    return arr;   
  }
  c(){
    let arr = [
      [`What is the size of the "empty" object?`, ['1 char on gcc 32 bit', '1 char on gcc 64 bit', '2 char on gcc 32 bit', '2 char on gcc 64 bit'], '1 char on gcc 32 bit'],
      [`Who is the author of C++?`, ['Charles Babbage', 'Denis Ritchie', 'Brain Karnighan', 'Bjarne Stroustrup'], 'Bjarne Stroustrup'],
      [`Which type of iterator doesn't exist in C++?`, ['input', 'bidirectional', 'unidirectional', 'static'], 'static'],
      [`What keyword doesn't exist in C++`, ['friend', 'protect', 'public', 'private'], 'protect'],
      [`Which type is not fundamental in C++?`, ['void', 'float', 'string', 'char'], 'string'],
      [`Which operator used to resolve the scope of the global variable?`, ['->', '::', '*', '.'], '::'],
      [`How make an class act as an interface in C++?`, ['Defining the class following with the keyword virtual', 'Defining the class following with the keyword interface', 'Defining the class following with the keyword abstract', 'By only providing all the functions as virtual functions in the class'], 'By only providing all the functions as virtual functions in the class'],
      [`What is the valid declaration for overloading ++ in postfix form where T is the class name.`, ['T operator++();', 'T operator++(int);', 'T& operator++();', 'T& operator++(int);'], 'T operator++(int);'],
      [`What is the full form of STL?`, ['Standard template library', 'System template library', 'Standard topics library', 'None of the above'], 'Standard template library'],
      [`Which option is not applicable for the constructor?`, ['Cannot be called explicitly', 'Cannot be overloaded', 'Cannot be overridden', 'None of the above'], 'Cannot be overridden']
    ];
    return arr;
  }
  java(){
    let arr = [
      [`What is the default value of Object variable?`, ['undefined', '0', 'null', 'not defined'], 'null'],
      [`What is an applet?`, ['An applet is a Java program that runs in a Web browser', 'Applet is a standalone java program', 'Applet is a tool', 'Applet is a run time environment'], 'An applet is a Java program that runs in a Web browser'],
      [`Which of the following is false about String?`, ['String is immutable', 'String can be created using new operator', 'String is a primary data type', 'None of the above'], 'String is a primary data type'],
      [`Which operator is considered to be with highest precedence?`, ['(), []', '=', '?:', '%'], '(), []'],
      [`What is function overloading?`, ['Methods with same name but different parameters', 'Methods with same name but different return types', 'Methods with same name, same parameter types but different parameter names', 'None of the above'], 'Methods with same name but different parameters'],
      [`What is the size of char variable?`, ['8 bit', '16 bit', '32 bit', '64 bit'], '16 bit'],
      [`What is the parent of Error and Exception classes?`, ['Throwable', 'Catchable', 'MainError', 'MainException'], 'Throwable'],
      [`Which of the following is not a keyword in java?`, ['Boolean', 'static', 'void', 'private'], 'Boolean'],
      [`What is the default value of byte variable?`, ['0.0', 'null', '0', 'undefined'], '0'],
      [`What is the default value of int variable?`, ['0.0', 'null', '0', 'undefined'], '0']
    ];
    return arr;   
  }
  php(){
    let arr = [
      [`Which of the following method of Exception class returns source filename?`, ['getMessage()', 'getCode()', 'getFile()', 'getLine()'], 'getFile()'],
      [`Which of the following function opens a file?`, ['fopen()', 'fread()', 'filesize()', 'file_exist()'], 'fopen()'],
      [`Which of the following is used to create a session?`, ['session_start() function', '$_SESSION[]', 'isset() function', 'session_destroy() function'], 'session_start() function'],
      [`Which of the following type of variables are instances of programmer-defined classes?`, ['Strings', 'Arrays', 'Objects', 'Resources'], 'Objects'],
      [`What can be used to concatenate two strings?`, ['.', '+', 'add()', 'append()'], '.'],
      [`Which of the following method returns a formatted string representing a date?`, ['time()', 'date()', 'getdate()', 'None of the above'], 'date()'],
      [`Which of the following method returns current date and time?`, ['time()', 'date()', 'getdate()', 'None of the above'], 'time()'],
      [`Which of the following array represents an array with strings as index?`, ['Numeric Array', 'Associative Array', 'Multidimentional Array', 'None of the above'], 'Associative Array'],
      [`Which of the following method of Exception class returns array of the backtrace?`, ['getMessage()', 'getCode()', 'getTrace()', 'getTraceAsString()'], 'getTrace()'],
      [`Which of the following is used to destroy the session?`, ['session_start() function', '$_SESSION[]', 'isset() function', 'session_destroy() function'], 'session_destroy() function']
    ];
    return arr;   
  }
  ruby(){
    let arr = [
      [`What is the sequence of ruby strings?`, ['8-bit bytes', '16-bit bytes', '32-bit bytes', 'None of the mentioned'], '8-bit bytes'],
      [`Which of the following is not a valid datatype?`, ['Float', 'Integer', 'Binary', 'Timedate'], 'Timedate'],
      [`Which of the following datatypes is valid in Ruby?`, ['Numbers', 'Boolean', 'String', 'All of the mentioned'], 'All of the mentioned'],
      [`Which of the following is not a valid library function?`, ['Puts', 'Print', 'Get', 'Gets'], 'Get'],
      [`For getting an input from the user which method is used?`, ['get', 'gets.chomp', 'get-s', 'chomp'], 'gets.chomp'],
      [`Which sequence can be used to substitute the value of any ruby expression in a string?`, ['#(expr)', '#{expr}', '#expr', 'None of the mentioned'], '#{expr}'],
      [`Why is gets not preferred instead of gets.chomp?`, ['Gets add an extra new line while chomp removes it', 'Gets remove an extra new line', 'Chomp erases the value stored in the variable', 'All of the mentioned'], 'Gets add an extra new line while chomp removes it'],
      [`What error does the if condition gives if not terminated with end statement?`, ['Syntax error', 'Unexpected end', 'Expecting keyword end', 'All of the mentioned'], 'All of the mentioned'],
      [`Which of the following is a valid boolean operator?`, ['and(&&)', 'or(||)', 'not(!)', 'All of the mentioned'], 'All of the mentioned'],
      [`How to comment a single line?`, ['Using #', 'Using begin and end', 'Using //', 'None of the mentioned'], 'Using #']
    ];
    return arr;
  }
  python(){
    let arr = [
      [`Which of the following function sets the integer starting value used in generating random numbers?`, ['choice(seq)', 'randrange ([start,] stop [,step])', 'random()', 'seed([x])'], 'seed([x])'],
      [`Which of the following function convert an object to a string in python?`, ['int(x [,base])', 'long(x [,base] )', 'float(x)', 'str(x)'], 'str(x)'],
      [`Which of the following function gets a space-padded string with the original string left-justified to a total of width columns?`, ['isupper()', 'join()', 'len()', 'ljust()'], 'ljust()'],
      [`What is the following function gives the total length of the list?`, ['len()', 'length()', 'count()', 'cmp()'], 'len()'],
      [`Which of the following function convert an object to a regular expression in python?`, ['repr()', 'eval()', 'tuple()', 'list()'], 'repr()'],
      [`Which of the following is correct about Python?`, ['It supports automatic garbage collection', 'It can be easily integrated with C, C++, COM, ActiveX, CORBA, and Java', 'Both of the above', 'None of the above'], 'Both of the above'],
      [`Which of the following function removes all leading and trailing whitespace in string?`, ['replace()', 'strip()', 'swapcase()', 'title()'], 'strip()'],
      [`Which of the following function of dictionary gets all the values from the dictionary?`, ['getvalues()', 'value()', 'values()', 'None of the above'], 'values()'],
      [`Which of the following function convert a sequence of tuples to dictionary in python?`, ['set()', 'dict()', 'frozenset()', 'chr()'], 'dict()'],
      [`Which of the following function capitalizes first letter of string?`, ['shuffle()', 'capitalize()', 'isalnum()', 'isdigit()'], 'capitalize()']
    ];
    return arr;
  }
}
 

let result;
let answerArray = [];

let languages = ['javaScript', 'css', 'html', 'c', 'java', 'php', 'ruby', 'python']; // ЯП для монстров (уровней)
let taskField;
let main = document.querySelector('main'),
  body = $('body');
let attackQuestions, shieldQuestions, healQuestions, monstersPhrases; // массивы вопросов (чтобы исключить повторение вопросов)
let answerButtom; // кнопка "отправки" ответа, создается в процессе отображения задачи
const spellsPower = { // силы способностей (будем тестировать)
  attack: 40,
  shield: 50,
  heal: 30,
  helper: {
    health: 40,
    attack: 15,
  },
  multipleAttack: 20,
};
let player, monster; // объекты игрока и монстра
let level = 4;
let levelLanguage;
let spell, modal;
let gameBackground,
  offices = ['office-1', 'office-2', 'office-3', 'office-4'],
  fullGameBody = `<div class="game-background">
  <div class="door door-left"></div>
  <div class="door door-right"></div>
  <div class="hero-container"></div>
  <div class="monster-container">
      <div class="monster-head-container"></div>
      <div class="monster-body-container"></div>
      <div class="monster-legs-container"></div>
  </div>
</div>`,
  oneDoorGameBody = `<div class="game-background game-background-mirror">
<div class="door door-right"></div>
<div class="hero-container"></div>
</div>`;

let rightDoor = $(".door-right"),
    leftDoor = $(".door-left");

const monsterHeadContainer = $(".monster-head-container"),
      monsterBodyContainer = $(".monster-body-container"),
      monsterLegsContainer = $(".monster-legs-container"),
      monsterHeadArray = ["monster-head-1", "monster-head-2", "monster-head-3", "monster-head-4"],
      monsterBodyArray = ["monster-body-1", "monster-body-2", "monster-body-3", "monster-body-4", "monster-body-5"],
      monsterLegsArray = ["monster-legs-1", "monster-legs-2", "monster-legs-3"];

const roleArray = ["Project Manager", "Product Owner", "Scrum Master", "Team Lead", "Key Developer"],
      nameArray = ["Jack", "Tom", "Dzmitry", "Abishek", "Alyaxey", "Richard", "John", "Kiran", "Yauheniy"],
      secondNameArray = ["Jones", "Abhishek", "Smith", "Brown", "Ivanou", "Hill", "Omar", "Clark"];


let receptionHTML = `<div class="game-background game-background-mirror">
                       <div class="door door-right"></div>
                       <div class="hero-container"></div>
                     </div>
                     <div class='dialog' id='dialog'>
                       <p class='dialog__message' id='message'></p>
                       <button type="button" class="dialog__button" id = 'dialogButton'>Start</button>
                     </div>`


class Player { // класс игрока
  constructor(name, character) {
    this.name = name;
    this.health = 100;
    this.spells = ['attack', 'shield', 'heal', 'helper', 'multipleAttack'];
    this.character = character; // ссылка на выбранного персонажа;
  }
}

/*new Door(leftDoor).openDoor();
new Door(rightDoor).openDoor();*/

class createPage { // класс для создания страниц (скорее всего, все уровни будут создаваться одним методом level)
  constructor() { }
  greeting() {
    const characters = document.getElementById('characters'); 
    Array.from(characters.children).forEach(div => {
      div.addEventListener('click', e => {
        let current = document.querySelector('.selected');
        let elem = e.target;
        if(current){
          current.classList.remove('selected');
        }
        if(elem.tagName === 'IMG'){
          elem = e.target.parentElement;
        };
        elem.classList.add('selected');
      });
    });
    const startButton = document.getElementById('startGame');
    startButton.addEventListener('click', new createPage().reception);
  }
  reception() { // страница ресепшена 
    new Helpers().createPlayer();
    main.classList.add('wrapper__reception');
    main.innerHTML = receptionHTML;
    gameBackground = $('.game-background');
    gameBackground.addClass('reception');

    let rDoor = document.querySelector('.door-right');
    rDoor.addEventListener('click', function() {
      new Door(rDoor).openDoor();
      setTimeout(new createPage().level, 1500);
    });

    setTimeout(function () {
      let dialogText = new Dialogs().instructions();
      new dialogActions().showDialog(dialogText);
    }, 200); 
  }
  level() { // страница уровня
    level++;
    levelLanguage = new Helpers().chooseLanguage(languages);
    main.innerHTML = `<div class="game-background">
                        <h1 class='level__caption'>Level ${level} - ${levelLanguage}</h1>
                        <div class='magic'>
                          <div class='magic__spell attack'>Attack</div>
                          <div class='magic__spell shield'>Shield</div>
                          <div class='magic__spell heal'>Heal</div>
                          <div class='magic__spell multi-attack'>Multi-attack</div>
                          <div class='magic__spell helper'>Helper</div>
                          <div class='magic__spell super'>Super</div>
                        </div>
                        <div class="door door-left"></div>
                        <div class="door door-right"></div>
                        <div class='hero-container'>
                          <div class="hero-health__wrapper">
                            <div class='hero-health-scale'>
                              <span class='hero-health-scale__number'></span>
                            </div>
                          </div>
                        </div>
                        <div class="monster-container">
                          <div class="monster-health__wrapper">
                            <div class='monster-health-scale'>
                              <span class='monster-health-scale__number'></span>
                            </div>
                          </div>
                          <div class="monster-head-container"></div>
                          <div class="monster-body-container"></div>
                          <div class="monster-legs-container"></div>
                        </div>
                        <div id="taskModal" class="modal">
                          <div class="task-modal-content">
                            <h1 class='task-caption'>TASK NAME</h1>
                            <div class='task-task-content'>
                              <p class='task-task-description' id='taskDesc'></p>
                              <p class='task-task-text' id='taskText'></p>
                            </div>
                            <div class='task-field' id='taskField'>
                              <div class='task-field-answer-container' id="taskFieldAnswer"> </div>
                              <div class='task-field-answer-btn-container' id="taskFieldBtn">
                                <input type="button" class='btn task-field-btn' value="Answer">
                              </div>
                            </div>
                          </div>
                        </div>                      
                        <div class='dialog' id = dialog>
                          <p class='dialog__message' id='message'></p>
                          <button type="button" class="dialog__button" id = 'dialogButton'>Start</button>
                        </div>
                      </div> `; //нарисовать страницу
    monster = new Monster(level);
    gameBackground = $('.game-background');
    taskField = document.getElementById('taskFieldAnswer');
    document.querySelector('.monster-health__wrapper').style.width = `${200 + 20*level}px`;
    document.querySelector('.hero-health-scale__number').innerHTML = player.health;
    document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
    gameBackground.addClass(new Helpers().randomArrayElem(offices));    
    new MonsterGenerator(monsterHeadContainer, monsterBodyContainer, monsterLegsContainer).generateMonster(monsterHeadArray, monsterBodyArray, monsterLegsArray);
    if (!monstersPhrases) {
      monstersPhrases = new Dialogs().monstersPhrases();
    }
    setTimeout(function () {
      let dialogText = new Helpers().randomArrayElem(monstersPhrases);
      new dialogActions().showDialog(Array.from(dialogText));
    }, 2000);

    let magic = document.querySelector('.magic');
    Array.from(magic.children).forEach(div => {
      div.addEventListener('click', e => {
        document.querySelector('.magic').classList.toggle('showSpells');
        spell = e.target.classList[1];
        modal = document.getElementById('taskModal');
        modal.style.display = 'block';
        new Spells()[spell]();
        //console.log(e.target.classList[1]);
      });
    });
  }
}

class Helpers {
  constructor() { }
  randomNumber(max) { // генератор случайных чисел
    return Math.floor(Math.random() * max);
  }
  randomArrayElem(arr) { // взять из массива случайный элемент и удалить его из массива
    let index = new Helpers().randomNumber(arr.length-1); // слуйный индекс
    return arr.splice(index, 1)[0]; // удаляем этот элемент из массива и возвращаем его 
  }
  chooseLanguage(languages) { // выбор языка для уровня
    let index = new Helpers().randomNumber(languages.length);
    let language = languages.splice(index, 1).toString();
    return language;
  }
  addRandomClass(target, sourceArray) {
    return target.addClass(sourceArray[this.randomNumber(sourceArray.length)]);
  }
  createPlayer() { // создание объекта игрока
    let character = document.querySelector('.selected') ? Array.from(document.querySelector('.selected').children)[0].src :
      document.querySelector('.greeting__profile_character-item').src; // если пользователь не выбрал персонажа - взять персонажа по умолчанию
    player = new Player(document.getElementById('name').value || 'Anonim', character);
  }
  createMonster() { } // сюда запихнем создание имени, тела, объекта 
}

class dialogActions { // методы окна диалога
  constructor() { }
  showDialog(text) { //показать окно
    let dialogWrapper = document.getElementById('dialog');
    dialogWrapper.classList.toggle('dialog-active');
    let dialogButton = document.getElementById('dialogButton');
    dialogButton.addEventListener('click', new dialogActions().closeDialog);
    new dialogActions().writeDialogText('message', text, 50);
  }
  writeDialogText(id, text, speed) { // вывод текста
    let ele = document.getElementById(id),
      txt = text.join("").split("");
    let interval = setInterval(function () {
      if (!txt[0]) {
        return clearInterval(interval);
      };
      ele.innerHTML += txt.shift();
    }, speed != undefined ? speed : 100);
    return false;
  }
  closeDialog() { // закрыть окно
    let dialogWrapper = document.getElementById('dialog');
    dialogWrapper.classList.toggle('dialog-active');
    if (level) {
      document.querySelector('.magic').classList.toggle('showSpells');
    }
  }
}

class Tasks { // дополнитльные (рандомные) задания
  constructor() { }
  calculator() {
    let rules = `Calculate the result.\nIf necessary, round the number to the nearest integer.`; //правило на этот тип задач
    let signs = [' + ', ' - ', ' * ', ' / '];
    let str = new Helpers().randomNumber(100) + signs[new Helpers().randomNumber(4)] + new Helpers().randomNumber(100); // пример
    let res = Math.round(eval(str)).toString(); //результат    
    console.log('Answer ', res);
    new giveTask().showTaskSimple(rules, str, res); // выводим на экран
  }
  putInRightOrder() {
    let rules = `Put code parts in the right order.`,
      res = [
        ["let max", "=", "(a, b)", "=>", "{", "a > b", ";", "}", ";"],
        ["setTimeout(", "()", "=>", "{", "return 'result'", ";", "},", "1)", ";"],
        ["for(", "var i = 0;", ";", "i++", ")", "{", "if (i > 3)", "break;", "}"],
        ["el", ".addEventListener(", '"click"', ",", "()", "=>", '{ alert("hello!"); }', ",", ");"],
        ["class", "Rectangle", "{", "constructor", "(height){", "this.height", "=", "height;", "} }"]
      ];

    let index = new Helpers().randomNumber(res.length); // генерируем рандомный индекс
    let answer = res[index]; // получаем массив с ответом
    let task = _.shuffle(res[index]);
    res.splice(index, 1); // удаляем этот вопрос из массива (вопросы не повторяются)
    new giveTask().showTaskOrder(rules, task, answer); // выводим на экран
  }
}

class Spells { // заклинания
  constructor() { } //в консоли пока отображаются ответы для задач
  attack() {
    console.log('HERE');
    console.log("LANGUAGE: ",levelLanguage);
    console.log('ARR: ', attackQuestions);
    if (!attackQuestions) {
      attackQuestions = new AttackQuestions()[levelLanguage](); // получаем массив в вопросами для данного уровня
    };
    let question = new Helpers().randomArrayElem(attackQuestions);
    console.log('Answer ', question[1]);
    let rules = new AttackQuestions().rules; // правила для этого вида заклинаний
    new giveTask().showTaskSimple(rules, question[0], question[1]); // выводим вопрос
  }
  shield() {
    if (!shieldQuestions) {
      shieldQuestions = new ShieldQuestions()[levelLanguage]();
    }
    let question = new Helpers().randomArrayElem(shieldQuestions);
    console.log('Answer ', question[1]);
    let rules = new ShieldQuestions().rules;
    new giveTask().showTaskSimple(rules, question[0], question[1]);
  }
  heal() {
    if (!healQuestions) {
      healQuestions = new HealQuestions()[levelLanguage]();
    }
    let question = new Helpers().randomArrayElem(healQuestions);
    let rules = new HealQuestions().rules;
    new giveTask().showTaskWithOptions(rules, question[0], question[1], question[2]);
    console.log('Answer ', question[2]);
  }
}

class giveTask { // вывод вопросов на экран
  constructor() { }
  showTaskSimple(rules, task, answer) { // вопросы по схеме правило -> текст 
    taskField.innerHTML = `<input type="text" class='task__form_answer'>`;
    answerButtom = document.querySelector('.btn');
    let description = document.getElementById('taskDesc');
    let text = document.getElementById('taskText');
    description.innerHTML = rules;
    text.innerHTML = task;
    result = new checkAnswer(answer); // создаем новый объект, в котором будет храниться ответ и проверяться ответ пользователя
    answerButtom.addEventListener('click', result.checkSimpleAnswer); // по клику - проверять результат
  }
  showTaskWithOptions(rules, task, options, answer) { //вопросы по схеме правило -> варианты ответов 
    taskField.innerHTML = `<label><input type='radio' class='task__form_options' name='answer' value='${options[0]}'>${options[0]}</label>
                           <label><input type='radio' class='task__form_options' name='answer' value='${options[1]}'>${options[1]}</label>
                           <label><input type='radio' class='task__form_options' name='answer' value='${options[2]}'>${options[2]}</label>
                           <label><input type='radio' class='task__form_options' name='answer' value='${options[3]}'>${options[3]}</label>`;
    answerButtom = document.querySelector('.btn');
    let description = document.getElementById('taskDesc');
    let text = document.getElementById('taskText');
    description.innerHTML = rules;
    text.innerHTML = task;
    result = new checkAnswer(answer); // создаем новый объект, в котором будет храниться ответ и проверяться ответ пользователя
    answerButtom.addEventListener('click', result.checkSelectedAnswer);
  }
  showTaskOrder(rules, task, answer) {
    taskField.innerHTML = `<ul class="sortable task-filed-answer">
                        <li class="default" id="id_1">${task[0]}</li>
                        <li class="default" id="id_2">${task[1]}</li>
                        <li class="default" id="id_3">${task[2]}</li>
                        <li class="default" id="id_4">${task[3]}</li>
                        <li class="default" id="id_5">${task[4]}</li>
                        <li class="default" id="id_6">${task[5]}</li>
                        <li class="default" id="id_7">${task[6]}</li>
                        <li class="default" id="id_7">${task[7]}</li>
                        <li class="default" id="id_7">${task[8]}</li>
                      </ul>`;
    // <input type="button" class='btn task-filed-btn' value="Answer">`;
    answerButtom = document.querySelector('.task-field-btn');
    let description = document.getElementById('taskDesc');
    description.innerHTML = rules;
    result = new checkAnswer(answer); // создаем новый объект, в котором будет храниться ответ и проверяться ответ пользователяЧ
    $(function () {
      $(".sortable").sortable();
    });
    answerButtom.addEventListener('click', result.checkDroppedAnswer);
  }
}

class checkAnswer { // класс проверки ответов
  constructor(res) {
    this.result = res; // при создании запоминаем правильный ответ из условия 
  }
  checkSimpleAnswer() { // проверка для обычного текстового ответа
    let answer = document.querySelector('.task__form_answer').value.replace(/(^\s*)|(\s*)$/g, '').toLowerCase();
    if (answer === result.result) {
      console.log(true);
      new doSpell()[spell]();
    } else {
      console.log(false);
      //wrong, just close the frame 
    }
  }
  checkSelectedAnswer() { // проверка для вопросов с вариантами ответов
    console.log(taskField.querySelector(':checked').value);
    let answer = taskField.querySelector(':checked').value;
    if (answer === result.result) {
      console.log(true);
      new doSpell()[spell]();

    } else {
      console.log(false);
      //wrong, just close the frame 
      // передать ход монстру
    }
  }
  checkDroppedAnswer() {
    let children = $('.sortable').sortable('refreshPositions').children();
    $.each(children, function () {
      answerArray.push($(this).text().trim());
    });
    if (_.isEqual(answerArray, result.result)) {
      console.log(true);
      answerArray = [];
      // correct, do action
    } else {
      console.log(false);
      answerArray = [];
      //wrong, just close the frame 
    }
  }
}


class doSpell{
  constructor(){}
  attack(){
    modal.style.display = 'none';
    let monsterHealth = monster.health;
    if (monster.shield) {
      monster.health += monster.shield;
    };
    monster.health -= 40;
    if (monster.health > (100 + 20 * level)) {
      monster.shield = monster.health - 100 + 20 * level;
      monster.health = 100 + 20 * level;
    };
    if(monster.health <= 0) {
      monster.health = 0;
      console.log('win');
      document.querySelector('.monster-health-scale').style.width = `${monster.health}%`;
      document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
      // написать ф-ю победы на уровне и перейти в нее
    };
      document.querySelector('.monster-health-scale').style.width = `${monster.health*100/(100 + 20 * level)}%`;
      document.querySelector('.monster-health-scale').style.marginLeft = `${100 - monster.health*100/(100 + 20 * level)}%`;
      document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
      // передать ход монстру 
  }
  shield(){
    modal.style.display = 'none';
    if (!player.shield){
      player.shield = 50;
      // придумать внешнее отображение щита
    };
  }
  heal(){
    modal.style.display = 'none';
    if (player.health < 100) {
      player.health += 30;
      if (player.health > 100) {
        player.health = 100;
      };
    };
    document.querySelector('.hero-health-scale').style.width = `${player.health}%`;
    document.querySelector('.hero-health-scale__number').innerHTML = player.health;
    // передать ход монстру 
  }
}

class Dialogs {
  constructor() { }
  instructions() {
    // потом разобъем строку на части, чтобы красиво отображать
    let arr = [`Hello, ${player.name}, we were waiting for you! Welcome to 'Company name' - one of the best companies in the world. To get a job you have to go through 5 interviews. Each interview will check your knowledge in some programming language. Your "monsters" are waiting for you, if you are ready - go through that door. Good luck!`];
    return arr;
  }
  monstersPhrases() {
    let arr = [
      `Well ${player.name}, let's check your ${levelLanguage} skills.`,
      `Heard you are a big fan of ${levelLanguage}. Will see!`,
      `Glad to see you, ${player.name}! Let's do ${levelLanguage}.`,
      `You think my level is easy? ${levelLanguage} is not a language, it's a life style!`,
      `Let's see what you got, ${player.name}!`,
      `Let's see how you cope with ${levelLanguage} level, ${player.name}!`,
      `I can't wait to start, ${player.name}!`,
      `Don't be afraid, ${player.name}, ${levelLanguage} - it's easy. Let's start!`,
      `You shall not pass, ${player.name}!!!`,
      `Only one candidate have passed this level. Are you ready, ${player.name}?`
    ];
    return arr;
  }
  monstersPhrasesFinal() {
    let arr = [
      `Great work, ${player.name}! It is the last test, let's begin!`,
      `Was it easy to get here? Well, the last fight!`,
      `Don't be too happy, ${player.name}! Here everything can end!`
    ];
    return arr;
  }
}

class Door {
  constructor(door) {
    this.door = door;
  }
  openDoor() {
    this.door.classList.add("doorOpened");
  }
}

class MonsterGenerator {
  constructor(head, body, legs) {
    this.head = head;
    this.body = body;
    this.legs = legs;
  }
  generateMonster(headArray, bodyArray, legsArray) {
    new Helpers().addRandomClass(this.head, headArray);
    new Helpers().addRandomClass(this.body, bodyArray);
    new Helpers().addRandomClass(this.legs, legsArray);
  }
}

class NameGenerator {
  constructor(nameOptionsArray1, nameOptionsArray2, nameOptionsArray3) {
    this.position = nameOptionsArray1;
    this.name = nameOptionsArray2;
    this.surname = nameOptionsArray3;
  };
  generateRandomName() {
    return console.log(this.position[new Helpers().randomNumber(this.position.length)] + ' ' +
                       this.name[new Helpers().randomNumber(this.name.length)] + ' ' +
                       this.surname[new Helpers().randomNumber(this.surname.length)]);
  }
}

class Monster { // класс монстра
  constructor(level) {
    this.name = new NameGenerator(roleArray, nameArray, secondNameArray).generateRandomName();
    this.health = 100 + 20 * level;  // переменная, которая будет определять номер уровеня (1, 2, 3, 4, 5)
    this.spells = ['attack', 'shield', 'heal', 'helper', 'multipleAttack'];
  }
}

new createPage().greeting();
// rightDoor.addEventListener('click', new createPage().level);
// leftDoor.addEventListener('click', new createPage().level);
//тест разных способностей

//new Spells().heal();
//new Spells().attack();
//new Spells().shield();
//new Tasks().calculator();

// $("#myBtn").click(new Tasks().putInRightOrder());