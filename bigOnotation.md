**_O(1)_**
An algorithm that will always execute in the same time (or space) regardless of the size of the input data set.

```kotlin
fun isFirstElementNull(list: List<String?>) = list[0]==null
```

**_O(n)_**
An algorithm whose performance will grow linearly and in direct proportion to the size of the input data set. 
Big O favors the worst-case performance scenario.

```kotlin
fun containsValue(list: List<String>, value: String): Boolean {
    list.forEach { it ->
        if (it == value) return true
    }
    return false
} 
```
**_O(k+n)_**
*Counting sort*
Counting sort is an efficient algorithm for sorting an array of elements that each have a non-negative integer key.
The first loop goes through A, which has n elements. This step has a O(n) running time. k is the highest value in this list + 1.
The second loop iterates over k, so this step has a running time of O(k).
The third loop iterates through A, and this has a running time of O(n). Therefore, the counting sort algorithm has a running time of O(k+n).
```kotlin
fun counting_sort(list: MutableList<Int>) {
    // Create temp array to count the # occurrences of each value in the list
    // - The index of the countingArray maps to values of items in the list
    // - countingArray[index] maps to # occurrences of that value
    val countingArray = IntArray(if (list.max() == null) 0 else list.max()!! + 1)
    for (item in list) countingArray[item]++

    // Regenerate the list using the countingArray
    var cursor = 0
    for (index in 0 until countingArray.size) {
        val value = index
        val numberOfOccurrences = countingArray[index]
        if (numberOfOccurrences > 0)
            repeat(numberOfOccurrences) {list[cursor++] = value}
    }
}
```
**_O(n^2)_**
O(n^2) (or quadratic) represents an algorithm whose performance is directly proportional to the square of the size of the input data set. This is common with algorithms that involve nested iterations over the data set such as the example below.

Detect duplicates
```kotlin
fun containsDuplicates(list: List<String>) : Boolean {
    with(list) {
        for (cursor1 in 0 until size) {
            for (cursor2 in 0 until size) {
                if (cursor1 != cursor2) {
                    if (get(cursor1) == get(cursor2)) return true
                }
            }
        }
    }    
    return false
}
```
Deeper nested iterations will result in O(n^3), O(n^4) etc.


**Bubble sort**
Here’s an example of Bubble sort which is also O(n^2). For a list size of 4, this creates 6 comparisons and up to 6 swaps (which is (4-1)!). More info on factorial functions.

In the first pass of the x loop, this simplistic algorithm bubbles the highest / lowest item to the top of the list. Then it does x+1 .. size-1 loops (for each subsequent pass of the x loop) to bubble the highest / lowest remaining item to the rest of the array indices.

```kotlin
/** O(n^2) */
fun bubble_sort(list: MutableList<String>) {
    val size = list.size

    for (x in 0 until size) {
        for (y in x + 1 until size) {
            println("\tx=$x, y=$y")
            if (list[y] < list[x]) {
                list.swap(y, x)
            }
        }
    }
}

fun <T> MutableList<T>.swap(index1: Int, index2: Int) {
    val tmp = this[index1] // 'this' corresponds to the list
    this[index1] = this[index2]
    this[index2] = tmp
}
```



## O(2^n)

O(2^n) denotes an algorithm whose growth doubles with each addition to the input data set. The growth curve of an O(2^n) function is exponential - starting off very shallow, then rising meteorically. Here’s an example of an O(2^n) function is the recursive calculation of [Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number).

```
fun fib(number: Int): Int =
    if (number <= 1) number
    else fib(number - 1) + fib(number - 2)
```



## O(log n)

### Binary Search

[Binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) is a technique used to search sorted data sets. It works by selecting the middle element of the data set, essentially the median, and compares it against a target value.

- If the values match it will return success.
- If the target value is higher than the value of the probe element it will take the upper half of the data set and perform the same operation against it.
- Likewise, if the target value is lower than the value of the probe element it will perform the operation against the lower half.

It will continue to halve the data set with each iteration until the value has been found or until it can no longer split the data set.

This type of algorithm is described as O(log n).

 

```kotlin
fun binarySearch(item: String, list: List<String>): Boolean {
    // Exit conditions (base cases)
    if (list.isEmpty()) {
        return false
    }

    // Setup probe
    val probeIndex = list.size / 2
    val probeItem = list[probeIndex]

    // Does the probe match? If not, split and recurse
    when {
        item == probeItem -> return true
        item < probeItem -> return binarySearch(item, 
                                                list.subList(0, probeIndex))
        else -> return binarySearch(item, 
                                    list.subList(probeIndex + 1, size))
    }
}
```



## O(n * log n)

### Merge Sort

[Merge sort](https://en.wikipedia.org/wiki/Merge_sort) is an algorithm that is n * log n in runtime complexity. It’s a divide and conquer algorithm that splits a given list in half recursively, until each list only has 1 element in it. Then it merges these lists back into one big list by sorting each one of these smaller lists and merging them back up into larger and larger lists.

- The number of stages of the divide and conquer phase where the main list is recursively split and then merged back, is O(log n).
- For each O(log n) stage, about O(n) comparisons need to be made (after the divide phase) to compare and merge these smaller lists back into larger and larger lists.
- So it ends up being O(n * log n).



```kotlin
/**
 * O(n * log(n))
 *
 * This function doesn't actually do any sorting (actually done in [merge]).
 * - O(log(n)) -> recursively splitting the given list into smaller lists.
 * - O(n) -> merging two pre-sorted lists quickly (the [merge] function).
 *
 * [Graphic depicting merge sort in action](http://bit.ly/2u1HuNp).
 *
 * We can also describe the steps of the algorithm a little differently:
 *
 * 1) Split the n elements of the list into n separate lists, each of size one.
 * 2) Pair adjacent lists and merge them, resulting in about half as many lists
 *    each about twice the size.
 * 3) Repeat step 2 until you have one list of size n.
 *
 * After the last recursive calls, we are operating on arrays of size 1, which
 * cannot be split any further and are trivially sorted themselves, thus giving
 * us our base case.
 * 
 * Please note that [quick_sort] on average runs 2-3 times faster merge sort.
 */
fun merge_sort(list: MutableList<String>): MutableList<String> {
    // Can't split lists anymore, so stop recursion
    val length = list.size
    if (length <= 1) return list

    // Split the list into two and recurse (divide)
    val middleIndex = length / 2
    val leftList = merge_sort(list.subList(0, middleIndex))
    val rightList = merge_sort(list.subList(middleIndex, length))

    // Merge the left and right lists (conquer)
    return merge(leftList, rightList)
}

/**
 * In this step, the actual sorting of 2 already sorted lists occurs.
 *
 * The merge sort algorithm takes advantage of the fact that two sorted 
 * lists can be merged into one sorted list very quickly.
 */
fun merge(leftList: MutableList<String>, rightList: MutableList<String>): 
        MutableList<String> {
    val result = mutableListOf<String>()
    var leftIndex = 0
    var rightIndex = 0

    while (leftIndex < leftList.size && rightIndex < rightList.size) {
        val lhs = leftList[leftIndex]
        val rhs = rightList[rightIndex]
        if (lhs < rhs) {
            result.add(lhs)
            leftIndex++
        } else {
            result.add(rhs)
            rightIndex++
        }
    }

    // Copy remaining elements of leftList (if any) into the result
    while (leftIndex < leftList.size) {
        result.add(leftList[leftIndex])
        leftIndex++
    }

    // Copy remaining elements of rightList (if any) into the result
    while (rightIndex < rightList.size) {
        result.add(rightList[rightIndex])
        rightIndex++
    }

    return result
}
```



### Quick Sort

[Quick sort](https://www.geeksforgeeks.org/quick-sort/) is another divide and conquer algorithm with better performance than merge sort. The main difference between quick sort and merge sort is that for quick sort, all the “heavy” lifting is done while the list is being split in two, whereas with merge sort, we simply split the list in two and worry about sorting it later.

In quick sort, the list is partitioned by picking an arbitrary value (a pivot value), which is typically the last element of the list itself. This partition function then puts all the values that are smaller than it to the left of the list, and the ones higher than it to the right of the list, then is moved into the correct position in the list (not necessarily the middle). Then recursively, the list is split to the left and right of this pivot, until there’s nothing left to split.

**Divide** - When you divide the list into two, you pick a pivot point (typically the last element of the array) and then all the elements smaller than it get moved to the left of it, and all of those larger than it get moved to the right of it, so the pivot point is effectively moved to its ultimate sorted position.

**Conquer** - All elements to the left are fed recursively back into the algorithm, as are elements to the right until the entire list is sorted.



```
/**
 * O(n * log(n))
 * 
 * Quick sort on average runs 2-3 times faster than [merge_sort].
 *
 * If the data is mostly pre-sorted, then the runtime performance will
 * be worse than expected, and will approach O(n^2). Ironically, the
 * pre-sorted data takes longer to sort than the “random” data. The 
 * reason is because the pivot point will always be picked 
 * sub-optimally, with a “lopsided” partitioning of the data.
 * When we pick this "lopsided" pivot, we are only reducing the problem
 * size by one element. If the pivot were ideal, we would be reducing
 * the problem size by half, since roughly half of the elements would
 * be to the left of the pivot and the other half to the right.
 */
fun quick_sort(list: MutableList<Int>,
               startIndex: Int = 0,
               endIndex: Int = list.size - 1) {
    if (startIndex < endIndex) {
        val pivotIndex = partition(list, startIndex, endIndex)
        quick_sort(list, startIndex, pivotIndex - 1) // Before pivot index
        quick_sort(list, pivotIndex + 1, endIndex) // After pivot index
    }
}

/**
 * This function takes last element as pivot, places the pivot
 * element at its correct (final) position in (fully) sorted list,
 * and places all smaller (smaller than pivot) to left of pivot
 * and all greater elements to right of pivot.
 * 
 * Ideally this pivot element would represent the median of the
 * sublist. But in this implementation we are choosing the end
 * of the sublist (the element at endIndex).
 */
fun partition(list: MutableList<Int>,
              startIndex: Int = 0,
              endIndex: Int = list.size - 1): Int {
    // Element to be placed at the correct position in the list
    val pivotValue = list[endIndex]

    // Index of element smaller than pivotValue
    var smallerElementIndex = startIndex

    // Make a single pass through the list (not including endIndex)
    for (index in startIndex until endIndex) {
        // If current element is smaller than equal to pivotValue then swap it w/
        // the element at smallerElementIndex
        val valueAtIndex = list[index]
        if (valueAtIndex < pivotValue) {
            list.swap(smallerElementIndex, index)
            smallerElementIndex++
        }
    }

    // Finally move the pivotValue into the right place on the list
    list.swap(smallerElementIndex, endIndex)

    // Return the index just after where the pivot value ended up
    return smallerElementIndex
}

fun MutableList<Int>.swap(index1: Int, index2: Int) {
    val tmp = this[index1] // 'this' corresponds to the list
    this[index1] = this[index2]
    this[index2] = tmp
}
```



## Substring search

It is a very common problem to search for the presence of a substring inside of a string. Let’s say that:

- the string is called `str` (with length `n`)
- the substring is `substr` (with length `m`).

### O(n * m) - Brute force approach

The brute force approach to string searches is done by simply sliding the pattern along the string until you find a match. Every time you slide down to the next character in `str`, this algorithm doesn’t really remember what it already knows about the string (since it iterates thru the entire length of the string at every iteration). It essentially forgets about what it knows about the string (already) for every `n-1` attempts that it makes to match the substring.

```
/**
 * O(m * n), where m = str.size, and n = substr.size.
 *
 * This is an inefficient brute force algorithm which has quadratic complexity O(n^2).
 */
fun substring(str: CharArray, substr: CharArray): Int {
    // substr can't be longer than str.
    if (substr.size > str.size) return 0

    // Iterate str using cursor1 and for each index look ahead to see if matches exist 
    // for substr.
    var occurrences = 0
    for (cursor1 in 0 until str.size) {
        var matchCount = 0
        for (cursor2 in 0 until substr.size) {
            if (str[cursor1 + cursor2] == substr[cursor2]) matchCount++
        }
        // Found a match.
        if (matchCount == substr.size) occurrences++
    }

    return occurrences
}
```

Please note that if you want to turn a Kotlin `String` into a `CharArray` you can use something like `"Hello world".toCharArray()`. Here’s more info about this on [stackoverflow](https://stackoverflow.com/questions/44772937/how-can-i-convert-chararray-arraychar-to-a-string).

### O(n + m) - Using a state machine

By using a state machine that is built from the substring pattern we can come up with a much better algorithm to match these patterns inside our string. The idea here is not to forget what we have already seen about the string as we iterate over each character in it.

This is a streaming algorithm where we pass one character at a time (as we iterate thru the entire string) to a state machine which matches the pattern in the substring. For every iteration:

- Each character is compared with the character at a cursor (which represents the state) in the substring.
- If there’s a match, this cursor is incremented, and at the next iteration, the next character in the pattern will be matched, and so on.
- When there’s a mismatch the cursor is reset to 0.
- And we know a match has been found when the cursor equals the length of the substring.

This approach is based on the idea of [Deterministic Finite Automaton](https://en.wikipedia.org/wiki/Deterministic_finite_automaton).

```
/**
 * O(m + n), where m = str.size, and n = substr.size
 *
 * This function uses a deterministic finite automation (DFA) method
 * which entails the use of a state machine to keep track of progress
 * in a game.
 */
fun substring_optimized(str: CharArray, substr: CharArray): Int {

    class StateMachine(val pattern: CharArray) {
        var cursor = 0
        fun add(character: Char) {
            if (pattern[cursor] == character) cursor++
            else cursor = 0
        }
        fun isMatch() = cursor == pattern.size
        fun reset() {cursor = 0}
    }

    val stateMachine = StateMachine(substr)
    var numberOfOccurrences = 0

    for (cursor in 0 until str.size) {
        stateMachine.add(str[cursor])
        if (stateMachine.isMatch()) {
            stateMachine.reset()
            numberOfOccurrences++
        }
    }

    return numberOfOccurrences

}
```





## Queues and stacks

![img](https://developerlife.com/assets/algo-3.svg)

## Depth first traversal / search

File systems on computers have a hierarchical file system. Searching for a folder by name is a very common thing to do on computers. On Unix machines, we can use the `find -name "somefile"`command. How would you implement this command? This is where DFS come into play!

Here’s a simple representation of folders in a hierarchical file system.

```
class Folder {
    val name: String

    private var _subFolders: MutableList<Folder> = mutableListOf()
    val subFolders: MutableList<Folder>
        get() = Collections.unmodifiableList(_subFolders)

    fun toDetailedString(): String {
        return "{name: $name, subFolders: ${subFolders.size}}"
    }

    override fun toString(): String {
        return name
    }

    fun isNamed(nameArg: String): Boolean {
        return name == nameArg
    }

    constructor(name: String) {
        this.name = name
    }

    constructor(name: String, root: Folder) {
        this.name = name
        root.addSubfolder(this)
    }

    fun addSubfolders(vararg folders: Folder) {
        folders.forEach { addSubfolder(it) }
    }

    fun addSubfolder(f: Folder) {
        if (!_subFolders.contains(f)) {
            _subFolders.add(f)
        }
    }

    fun hasSubfolders(): Boolean {
        return !_subFolders.isEmpty()
    }

}
```

Here’s a function that creates a set of nested folders that we can search.

```
/*
Create a tree of folders that need to be searched.

    root
      + opt
        + chrome
      + apps
        + idea
        + androidstudio
      + dev
        + java
          + jdk8
          + jdk11

*/
fun makeSampleFolders(): Folder {
    val root = Folder("root")

    val opt = Folder("opt", root)
    val apps = Folder("apps", root)
    val dev = Folder("dev", root)

    val apps_idea = Folder("idea", apps)
    val apps_as = Folder("androidstudio", apps)

    val opt_chrome = Folder("chrome", opt)

    val dev_java = Folder("java", dev)
    val dev_java_jdk8 = Folder("jdk8", dev_java)
    val dev_java_jdk11 = Folder("jdk11", dev_java)

    return root
}
```

And here’s an implementation of DFS for this example.

```
fun dfs(name: String, root: Folder): Boolean {
    val stack = ArrayDeque<Folder>()
    stack.push(root)
    var found = false
    while (stack.isNotEmpty()) {
        println("\n...while loop start... ".brightWhite() + "stack=$stack".brightCyan())
        val currentFolder = stack.pop()
        println("👆️️popped: " + currentFolder.toDetailedString().red())
        if (currentFolder.isNamed(name)) {
            found = true
            println("\tfound a matching folder")
        }
        for (f in currentFolder.subFolders) {
            stack.push(f)
            println("👇️push: " + f.toDetailedString().green())
        }
    }
    return found

}
```

### Implementation notes

- When sub folders are added to the stack, they are pulled out in reverse order. So if the insertion order is `opt -> apps -> dev`, then they will be retrieved in reverse order `dev -> apps -> opt`.
- The nature of the stack (the last folder added will be the first one retrieved in the while loop) makes the algorithm favor going “deeper” (or depth first, instead of breadth first). The last folder that’s added will be the first one that’s checked at the next iteration of the while loop. And its sub folders will be added to the stack. Repeat this and you have a depth first bias in folder traversal.
- Once a depth first path is exhausted (by reaching as far as it will go) then the algorithm back tracks, due to the nature of the stack. When `dev` path has been exhausted, then the next folder to embark upon (for the while loop) is the `apps` folder. When `apps` is exhausted, then back tracking via the stack, takes us to `opt`.

Here’s output from the code itself that highlights this in action for `bfs("jdk11", makeSampleFolders())`.

```
Stacks & Queues

...while loop start... stack=[root]
👆️️popped: {name: root, subFolders: 3}
👇️push: {name: opt, subFolders: 1}
👇️push: {name: apps, subFolders: 2}
👇️push: {name: dev, subFolders: 1}

...while loop start... stack=[dev, apps, opt]
👆️️popped: {name: dev, subFolders: 1}
👇️push: {name: java, subFolders: 2}

...while loop start... stack=[java, apps, opt]
👆️️popped: {name: java, subFolders: 2}
👇️push: {name: jdk8, subFolders: 0}
👇️push: {name: jdk11, subFolders: 0}

...while loop start... stack=[jdk11, jdk8, apps, opt]
👆️️popped: {name: jdk11, subFolders: 0}
	found a matching folder

...while loop start... stack=[jdk8, apps, opt]
👆️️popped: {name: jdk8, subFolders: 0}

...while loop start... stack=[apps, opt]
👆️️popped: {name: apps, subFolders: 2}
👇️push: {name: idea, subFolders: 0}
👇️push: {name: androidstudio, subFolders: 0}

...while loop start... stack=[androidstudio, idea, opt]
👆️️popped: {name: androidstudio, subFolders: 0}

...while loop start... stack=[idea, opt]
👆️️popped: {name: idea, subFolders: 0}

...while loop start... stack=[opt]
👆️️popped: {name: opt, subFolders: 1}
👇️push: {name: chrome, subFolders: 0}

...while loop start... stack=[chrome]
👆️️popped: {name: chrome, subFolders: 0}

jdk11 found: true
```

## Breadth first traversal / search

By replacing the stack in the example above w/ a queue, we end up w/ depth first search. Unlike the stack, which favors folder traversal to happen depth first (since the last item added to the stack is the first one that’s processed, and when a path is exhausted it backtracks to the previously added folder), a queue favors the first folder added to be processed. This results in a totally different behavior from the stack when we traverse our folder tree.

## Ring Buffer

The ring buffer is a queue abstract data type that’s implemented using a fixed size array. This makes it performant with additions and deletions from a runtime and memory standpoint.

The following is an implementation of it in Kotlin.

```
/**
 * RingBuffer uses a fixed length array to implement a queue, where,
 * - [tail] Items are added to the tail
 * - [head] Items are removed from the head
 * - [capacity] Keeps track of how many items are currently in the queue
 */
class RingBuffer<T>(val maxSize: Int = 10) {
    val array = mutableListOf<T?>().apply {
        for (index in 0 until maxSize) {
            add(null)
        }
    }

    // Head - remove from the head (read index)
    var head = 0

    // Tail - add to the tail (write index)
    var tail = 0

    // How many items are currently in the queue
    var capacity = 0

    fun clear() {
        head = 0
        tail = 0
    }

    fun enqueue(item: T): RingBuffer<T> {
        // Check if there's space before attempting to add the item
        if (capacity == maxSize) throw OverflowException(
            "Can't add $item, queue is full")

        array[tail] = item
        // Loop around to the start of the array if there's a need for it
        tail = (tail + 1) % maxSize
        capacity++

        return this
    }

    fun dequeue(): T? {
        // Check if queue is empty before attempting to remove the item
        if (capacity == 0) throw UnderflowException(
            "Queue is empty, can't dequeue()")

        val result = array[head]
        // Loop around to the start of the array if there's a need for it
        head = (head + 1) % maxSize
        capacity--

        return result
    }

    fun peek(): T? = array[head]

    /**
     * - Ordinarily, T > H ([isNormal]).
     * - However, when the queue loops over, then T < H ([isFlipped]).
     */
    fun isNormal(): Boolean {
        return tail > head
    }

    fun isFlipped(): Boolean {
        return tail < head
    }

    override fun toString(): String = StringBuilder().apply {
        this.append(contents().joinToString(", ", "{", "}").yellow())
        this.append(" [capacity=$capacity, H=$head, T=$tail]".blue())
    }.toString()

    fun contents(): MutableList<T?> {
        return mutableListOf<T?>().apply {
            var itemCount = capacity
            var readIndex = head
            while (itemCount > 0) {
                add(array[readIndex])
                readIndex = (readIndex + 1) % maxSize
                itemCount--
            }
        }
    }

}

class OverflowException(msg: String) : RuntimeException(msg)
class UnderflowException(msg: String) : RuntimeException(msg)
```

### Implementation notes

- Since the `array` is re-used for insertions and deletions, it becomes important to be able to track the usage or `capacity` of the `array` (as items are added and removed). This `capacity` is used to determine whether the `array` is full or empty, and is used to iterate thru the elements of the `array` if needed.
- In order to cycle around the `array`, the `head` and `tail` indices are updated such that when they hit the “end” of the `array`, they “flip” over. This means that when head reaches `maxSize + 1`, it just goes to `0`. This can be achieved easily by using the `%` operator. `tail = (tail+1) % maxSize` is the equivalent of `if (tail == maxSize) tail = 0`.
- In order to get all the elements out of the `array` (as a list) the `capacity` and the `head` (or read index) is used in order to get all the elements out as we would expect (which isn’t necessarily how they are laid out in the `array`).





## Induction

Let’s use an example to illustrate induction. Let’s say that you have a bunch of coins of fixed denominations. And you’re tasked with figuring out the fewest coins that you would need to put together in order to arrive at some total amount. Let’s say you have denominations of 1, 5, 7, 11 and you’re asked to see how few coins you can select in order to get a total of 49.

## Brute force approach

Using the brute force approach you could simply see how many 11 denomination coins would get you close to the total. There would be a remainder (4 x 11 denomination coins = 44). Then you could see how many 7 denomination coins fit. And so on with 5 and 1 denomination coins. You could write this up in the following code.

```
/**
 * Brute force version of the recursive function [numCoins] above.
 *
 * - As you can see, there's a lot more code and complexity to compensate
 *   for very simplistic logic.
 * - The coin denominations are hard coded to be 1, 5, 7, 11.
 */
fun numCoins_nonrecursive(total: Int, coins: Coins) {
    // Exit condition.
    if (total == 0) return

    var currencyRemoved = 0

    // Remove all the 11 coins.
    val numberOf11s = (total / 11)
    if (numberOf11s > 0) {
        coins.numberOf11s += numberOf11s
        currencyRemoved += numberOf11s * 11
    }

    // Remove all the 7 coins.
    val numberOf7s = (total - currencyRemoved) / 7
    if (numberOf7s > 0) {
        coins.numberOf7s += numberOf7s
        currencyRemoved += numberOf7s * 7
    }

    // Remove all the 5 coins.
    val numberOf5s = (total - currencyRemoved) / 5
    if (numberOf5s > 0) {
        coins.numberOf5s += numberOf5s
        currencyRemoved += numberOf5s * 5
    }

    // Remove all the 1 coins.
    val numberOf1s = (total - currencyRemoved) / 1
    if (numberOf1s > 0) {
        coins.numberOf1s += numberOf1s
        currencyRemoved += numberOf1s * 1
    }

}

data class Coins(var numberOf1s: Int = 0,
                 var numberOf5s: Int = 0,
                 var numberOf7s: Int = 0,
                 var numberOf11s: Int = 0) {
    override fun toString() = StringBuilder().apply {
        val result = mutableListOf<String>()
        arrayOf(::numberOf1s, ::numberOf5s, ::numberOf7s, ::numberOf11s)
            .forEach {
                if (it.get() > 0)
                    result.add("#${it.name} coins = ${it.get()}")
            }
        append(result.joinToString(", ", "{", "}").brightBlue())
    }.toString()
}
```

## Recursion and breaking down the problem

The brute force approach produced a lot of code. And the denominations of the coins that we can use are hardcoded. This isn’t a good solution. Instead if we use induction and implement it with recursion, then we can do the following.

1. Come up with the simplest case that we can solve for (that will not require recursion).
2. Figure out a way to call the function that you’re writing w/ arguments that represent a smaller subset of the problem and use the return value from the function to assemble the final result (whatever that may be).
   - This usually entails performing some logic and then generating new arguments for the same function, that break the problem down into smaller problems.
   - Calls need to be made to the function (recursively) and the result from these calls need to be combined into a final result somehow.

Using this approach this is what the code might look like for the minimum number of coins problem.

```
/**
 * Use the process of induction to figure the min number of coins it takes 
 * to come up with the given [total]. The coin denominations you can used 
 * are in [denominations]; this list must be sorted already (in descending 
 * order), eg: [11, 7, 5, 1].
 * [coinsUsedMap] has keys that represent the denomination, and value that 
 * represent the number of coins used of that denomination.
 */
fun numCoins(total: Int,
             denominations: List<Int>,
             coinsUsedMap: MutableMap<Int, Int>): Int {
    // Show the function call stack.
    println("\tnumCoins(total=$total, denominations=$denominations)".brightYellow())

    // Stop recursion when these simple exit conditions are met.
    if (total == 0) return 0
    if (denominations.isEmpty()) return 0

    // Breakdown the problem further.
    val coinDenomination = denominations[0]
    val coinsUsed = total / coinDenomination

    // Remember how many coins of which denomination are used.
    if (coinsUsed > 0) coinsUsedMap.computeIfAbsent(coinDenomination) { coinsUsed }

    // Breakdown the problem into smaller chunk using recursion.
    return coinsUsed + 
        numCoins(total = total - coinsUsed * coinDenomination,
                 denominations = denominations.subList(1, denominations.size),
                 coinsUsedMap = coinsUsedMap)
}
```

## Other examples of using recursion

### Quick Sort

You can apply the steps above (simplest case, perform logic, split arguments into smaller subset of the problem) to many other examples, such as quick sort.

```
/** O(n * log(n)) */
fun quick_sort(list: MutableList<Int>,
               startIndex: Int = 0,
               endIndex: Int = list.size - 1) {
    if (startIndex < endIndex) {
        // Perform some logic to break down the problem
        val pivotIndex = partition(list, startIndex, endIndex)
        
        // Recurse before pivot index
        quick_sort(list, startIndex, pivotIndex - 1) 
        
        // Recurse after pivot index
        quick_sort(list, pivotIndex + 1, endIndex) 
    }
}

/**
 * This function takes last element as pivot, places the pivot
 * element at its correct position in sorted list, and places
 * all smaller (smaller than pivot) to left of pivot and all greater
 * elements to right of pivot 
 */
fun partition(list: MutableList<Int>,
              startIndex: Int = 0,
              endIndex: Int = list.size - 1): Int {
    // Element to be placed at the correct position in the list
    val pivotValue = list[endIndex]

    // Index of smaller element
    var smallerElementIndex = startIndex

    // Make a single pass through the list
    for (index in startIndex until endIndex) {
        // If current element is smaller than equal to pivotValue
        // then swap it w/ the element at smallerElementIndex
        val valueAtIndex = list[index]
        if (valueAtIndex < pivotValue) {
            list.swap(smallerElementIndex, index)
            smallerElementIndex++
        }
    }

    // Finally move the pivotValue into the right place on the list
    list.swap(smallerElementIndex, endIndex)

    // Return the index just after where the pivot value ended up
    return smallerElementIndex
}

fun MutableList<Int>.swap(index1: Int, index2: Int) {
    val tmp = this[index1] // 'this' corresponds to the list
    this[index1] = this[index2]
    this[index2] = tmp
}
```

### Binary Search

```
fun binarySearch(item: String, list: List<String>): Boolean {
    // Exit conditions (base cases)
    if (list.isEmpty()) {
        return false
    }

    // Setup probe
    val size = list.size
    val probeIndex = size / 2
    val probeItem = list[probeIndex]

    // Does the probe match? If not, split and recurse
    when {
        item == probeItem -> return true
        item < probeItem -> return binarySearch(item, 
                                                list.subList(0, probeIndex), 
                                                stats)
        else -> return binarySearch(item, 
                                    list.subList(probeIndex + 1, size), 
                                    stats)
    }
}
```





## Undirected graphs

Here’s code in Kotlin that describes undirected graphs with an adjacency list to represent the edges. For more info, checkout this [website](https://www.geeksforgeeks.org/graph-and-its-representations/).

- The adjacency list is stored in a `HashMap`, which holds a `HashSet` of nodes.
- We use a [`HashSet`](https://www.geeksforgeeks.org/hashset-in-java/) instead of [`LinkedHashSet`](https://www.geeksforgeeks.org/linkedhashset-in-java-with-examples/) because the order of insertion doesn’t really matter. This is also why we don’t use [`TreeSet`](https://www.geeksforgeeks.org/treeset-in-java-with-examples/), since the edges don’t need to be sorted.
- A node / vertex in this graph can be of any class (`T`).

Here’s an image of an undirected graph.

![img](https://developerlife.com/assets/algo-4.svg)

```
/**
 * [More info](https://www.geeksforgeeks.org/graph-and-its-representations/).
 */
class Graph<T> {
    val adjacencyMap: HashMap<T, HashSet<T>> = HashMap()

    fun addEdge(sourceVertex: T, destinationVertex: T) {
        // Add edge to source vertex / node.
        adjacencyMap
            .computeIfAbsent(sourceVertex) { HashSet() }
            .add(destinationVertex)
        // Add edge to destination vertex / node.
        adjacencyMap
            .computeIfAbsent(destinationVertex) { HashSet() }
            .add(sourceVertex)
    }

    override fun toString(): String = StringBuffer().apply {
        for (key in adjacencyMap.keys) {
            append("$key -> ")
            append(adjacencyMap[key]?.joinToString(", ", "[", "]\n"))
        }
    }.toString()
}
```

### DFS

To do a depth first traversal of the graph, here’s some code that uses a Stack (LIFO).

```
/**
 * Depth first traversal leverages a [Stack] (LIFO).
 *
 * It's possible to use recursion instead of using this iterative
 * implementation using a [Stack].
 * Also, this algorithm is almost the same as [breadthFirstTraversal], 
 * except that [Stack] (LIFO) is replaced w/ a [Queue] (FIFO).
 *
 * [More info](https://stackoverflow.com/a/35031174/2085356).
 */
fun <T> depthFirstTraversal(graph: Graph<T>, startNode: T): String {
    // Mark all the vertices / nodes as not visited.
    val visitedMap = mutableMapOf<T, Boolean>().apply {
        graph.adjacencyMap.keys.forEach { node -> put(node, false) }
    }

    // Create a stack for DFS. Both ArrayDeque and LinkedList implement Deque.
    val stack: Deque<T> = ArrayDeque()

    // Initial step -> add the startNode to the stack.
    stack.push(startNode)

    // Store the sequence in which nodes are visited, for return value.
    val traversalList = mutableListOf<T>()

    // Traverse the graph.
    while (stack.isNotEmpty()) {
        // Pop the node off the top of the stack.
        val currentNode = stack.pop()

        if (!visitedMap[currentNode]!!) {

            // Store this for the result.
            traversalList.add(currentNode)

            // Mark the current node visited and add to the traversal list.
            visitedMap[currentNode] = true

            // Add nodes in the adjacency map.
            graph.adjacencyMap[currentNode]?.forEach { node ->
                stack.push(node)
            }

        }

    }

    return traversalList.joinToString()
}
```

### BFS

To do a breadth first traversal of the graph, here’s some code that uses a Queue (FIFO). The following implementation doesn’t use recursion, and also keeps track of the depth as it’s traversing the graph. We also have to keep track of which nodes are visited and unvisited, so that we don’t backtrack and revisit node that have already been visited. The `depthMap` is optional as it is used to track the depth of the nodes, and used to stop traversal beyond a given `maxDepth`.

```
/**
 * Breadth first traversal leverages a [Queue] (FIFO).
 */
fun <T> breadthFirstTraversal(graph: Graph<T>,
                              startNode: T,
                              maxDepth: Int = Int.MAX_VALUE): String {
    //
    // Setup.
    //

    // Mark all the vertices / nodes as not visited. And keep track of sequence
    // in which nodes are visited, for return value.
    class VisitedMap {
        val traversalList = mutableListOf<T>()

        val visitedMap = mutableMapOf<T, Boolean>().apply {
            for (node in graph.adjacencyMap.keys) this[node] = false
        }

        fun isNotVisited(node: T): Boolean = !visitedMap[node]!!

        fun markVisitedAndAddToTraversalList(node: T) {
            visitedMap[node] = true
            traversalList.add(node)
        }
    }

    val visitedMap = VisitedMap()

    // Keep track of the depth of each node, so that more than maxDepth nodes
    // aren't visited.
    val depthMap = mutableMapOf<T, Int>().apply {
        for (node in graph.adjacencyMap.keys) this[node] = Int.MAX_VALUE
    }

    // Create a queue for BFS.
    class Queue {
        val deck: Deque<T> = ArrayDeque<T>()
        fun add(node: T, depth: Int) {
            // Add to the tail of the queue.
            deck.add(node)
            // Record the depth of this node.
            depthMap[node] = depth
        }

        fun addAdjacentNodes(currentNode: T, depth: Int) {
            for (node in graph.adjacencyMap[currentNode]!!) {
                add(node, depth)
            }
        }

        fun isNotEmpty() = deck.isNotEmpty()
        fun remove() = deck.remove()
    }

    val queue = Queue()

    //
    // Algorithm implementation.
    //

    // Initial step -> add the startNode to the queue.
    queue.add(startNode, /* depth= */0)

    // Traverse the graph
    while (queue.isNotEmpty()) {
        // Remove the item at the head of the queue.
        val currentNode = queue.remove()
        val currentDepth = depthMap[currentNode]!!

        if (currentDepth <= maxDepth) {
            if (visitedMap.isNotVisited(currentNode)) {
                // Mark the current node visited and add to traversal list.
                visitedMap.markVisitedAndAddToTraversalList(currentNode)
                // Add nodes in the adjacency map.
                queue.addAdjacentNodes(currentNode, /* depth= */currentDepth + 1)
            }
        }

    }

    return visitedMap.traversalList.toString()
}
```

## BFS and DFS traversal for binary trees

To see a similar implementation of BFS and DFS traversal for binary trees, please refer to the [Binary-Trees](https://developerlife.com/2018/08/16/algorithms-in-kotlin-6/) tutorial. Note that the binary tree traversal algorithm doesn’t need to have a map to mark visited nodes.

## Stacks and Queues

![img](https://developerlife.com/assets/algo-3.svg)

To learn more about stacks and queues, please refer to the [Queues](https://developerlife.com/2018/08/16/algorithms-in-kotlin-3/) tutorial.





## Binary Trees

![img](https://developerlife.com/assets/algo-5.png)

## Node data structure

```
data class Node<T>(val value: T,
                   var leftNode: Node<T>?,
                   var rightNode: Node<T>?,
                   var depth: Int = 0) {
    fun link(left: Node<T>?, right: Node<T>?) = this.apply {
        linkLeft(left).linkRight(right)
    }

    fun linkLeft(left: Node<T>?) = this.apply { leftNode = left }

    fun linkRight(right: Node<T>?) = this.apply { rightNode = right }

    fun depth(value: Int) = this.apply { depth = value }

    /**
     * Nodes on the left are in yellow, and those on the right are blue.
     */
    override fun toString(): String {
        return StringBuffer().apply {
            append("{${value.toString().green()}")
            if (leftNode != null)
                append(", ${leftNode.toString().yellow()}")
            if (rightNode != null)
                append(", ${rightNode.toString().blue()}}")
        }.toString()
    }
}
```

## Building the tree

The tree shown in the diagram above is built in code as follows.

```
/**
 * [Image of the generated tree](http://tinyurl.com/yckmlfkt)
 *        [A]
 *       /   \
 *     [B]    [C]
 *     / \    /  \
 *  [D]  [E] [F] [G]
 *               / \
 *             [H] [I]
 */
fun buildTree(): Node<Char> {
    val a = Node('a', null, null)
    val b = Node('b', null, null)
    val c = Node('c', null, null)
    val d = Node('d', null, null)
    val e = Node('e', null, null)
    val f = Node('f', null, null)
    val g = Node('g', null, null)
    val h = Node('h', null, null)
    val i = Node('i', null, null)

    a.link(b, c)
    b.link(d, e)
    c.link(f, g)
    g.link(h, i)

    return a
}
```

## Pre-order, in-order, and post-order recursive traversal

```
/**
 * A neat trick for pre-order traversals: starting from the root,
 * go around the tree counterclockwise. Print each node when you
 * pass its left side.
 */
fun <T> traversalPreOrder(node: Node<T>?, list: MutableList<T>) {
    if (node != null) {
        list.add(node.value)
        traversalPreOrder(node.leftNode, list)
        traversalPreOrder(node.rightNode, list)
    }
}

/**
 * A neat trick for in-order traversals: starting from the root,
 * go around the tree counterclockwise. Print each node when you
 * pass its bottom side.
 */
fun <T> traversalInOrder(node: Node<T>?, list: MutableList<T>) {
    if (node != null) {
        traversalInOrder(node.leftNode, list)
        list.add(node.value)
        traversalInOrder(node.rightNode, list)
    }
}

/**
 * A neat trick for post-order traversals: starting from the root,
 * go around the tree counterclockwise. Print each node when you
 * pass its right side.
 */
fun <T> traversalPostOrder(node: Node<T>?, list: MutableList<T>) {
    if (node != null) {
        traversalPostOrder(node.leftNode, list)
        traversalPostOrder(node.rightNode, list)
        list.add(node.value)
    }
}
```

## BFS (breadth first search) using a Queue

```
/**
 * Traverses the binary tree nodes in a sorted order.
 */
fun <T> breadthFirstTraversal(root: Node<T>): MutableList<Node<T>> {
    val queue = LinkedList<Node<T>>()
    val traversalList = mutableListOf<Node<T>>()

    // Add first node.
    queue.add(root)

    // Use queue to create breadth first traversal.
    while (queue.isNotEmpty()) {
        val currentNode = queue.poll()
        val depth = currentNode.depth

        // Add left node first.
        if (currentNode.leftNode != null)
            queue.add(currentNode.leftNode!!.depth(depth + 1))

        // Add right node next.
        if (currentNode.rightNode != null)
            queue.add(currentNode.rightNode!!.depth(depth + 1))

        // Add the node to the traversal list.
        traversalList.add(currentNode)
    }

    return traversalList
}
```

### Notes on the implementation

- BFS traversal of a binary tree results in a the nodes being visited in their sorted order.
- The trick in the `while` loop is leveraging the FIFO nature of the queue and allow the traversal of the tree from left node to right node, which results in a breadth first traversal.
- A `depth` field in the `Node` class is what keeps track of the number of branches from the root to this `Node`.
- The `Deque` interface supports both Stack and Queue ADTs (abstract data types).
- There is no need to track if a node is unvisited, or visited, as you would expected when traversing a graph, due to the nature of the binary tree.

## BFS (pretty print)

```
/**
 * Traverses the binary tree nodes in a sorted order.
 */
fun <T> printBFSTraversal(root: Node<T>): String {

    val queue = LinkedList<Node<T>>()
    // Add first node.
    queue.add(root)

    val mapVisitedDepth = mutableMapOf<Int, MutableList<T>>()
    // Use queue to create breadth first traversal.
    while (queue.isNotEmpty()) {
        val currentNode = queue.poll()
        val depth = currentNode.depth

        // Add left node first.
        if (currentNode.leftNode != null)
            queue.add(currentNode.leftNode!!.depth(depth + 1))

        // Add right node next.
        if (currentNode.rightNode != null)
            queue.add(currentNode.rightNode!!.depth(depth + 1))

        // Decide whether to print crlf or not.
        mapVisitedDepth.computeIfAbsent(depth){ mutableListOf()}
            .add(currentNode.value)
    }

    val outputString = StringBuilder()

    for (entry in mapVisitedDepth) {
        outputString.append(entry.value.joinToString(", ", postfix = "\n"))
    }

    return outputString.toString()
}
```

### Notes on implementation

- This is almost identical to the code above. The main difference here is that a `mapVisitedDepth``Map` is used in order to keep track of the depth of each traversed node, which can then be used to pretty print the output where a CRLF is added at the start of each new depth.

## DFS (depth first search) using a Stack

```
fun <T> depthFirstTraversal(root: Node<T>): MutableList<Node<T>> {
    val stack = LinkedList<Node<T>>()
    val traversalList = mutableListOf<Node<T>>()

    // Add first node.
    stack.push(root)

    // Use stack to create breadth first traversal.
    while (stack.isNotEmpty()) {
        val currentNode = stack.pop()
        val depth = currentNode.depth

        // Push right child to stack FIRST (so this will be processed LAST).
        if (currentNode.rightNode != null)
            stack.push(currentNode.rightNode!!.depth(depth + 1))

        // Push left child to stack LAST (so this will be processed FIRST).
        if (currentNode.leftNode != null)
            stack.push(currentNode.leftNode!!.depth(depth + 1))

        // Add to traversal list.
        traversalList.add(currentNode)
    }

    return traversalList
}
```

### Notes on the implementation

- The trick in the `while` loop is to leverage the LIFO nature of stack, in order to push the children on the right on top of the stack first, before the children on the left. Since the algorithm pops these items off the top of the stack, whatever was pushed last will get processed sooner (that what was pushed first). And this is what results in a depth first search.
- A `depth` field in the `Node` class is what keeps track of the number of branches from the root to this `Node`.
- The `Deque` interface supports both Stack and Queue ADTs (abstract data types).



## LRU and MRU

```
enum class Type { LRU, MRU }

class Cache<T>(val type: Type, val size: Int) {
    val map = mutableMapOf<T, Int>()
    var rank = 0

    fun put(value: T): T? {
        var evictedKey: T? = null

        when {
            map.containsKey(value) -> {
                // Increase rank of existing value.
                map[value] = rank++
            }
            map.size == size -> {
                // Remove the lowest or highest rank item in the map depending on Type.
                evictedKey = findKeyToEvict()
                map.remove(evictedKey)
                map.put(value, rank++)
            }
            else -> {
                // Add the new item.
                map.put(value, rank++)
            }
        }

        return evictedKey
    }

    /**
     * LRU means evict the item in the map w/ the lowest rank.
     * MRU means evict the item in the map w/ the highest rank.
     */
    fun findKeyToEvict(): T? {
        val rankToEvict = when (type) {
            Type.MRU -> Collections.max(map.values)
            Type.LRU -> Collections.min(map.values)
        }
        val keyToEvict = map.entries.find { it.value == rankToEvict }?.key
        return keyToEvict
    }
    
    override fun toString(): String = StringBuilder().apply {
        val list = mutableListOf<String>().apply {
            for (entry in map) 
                add("'${entry.key}'->rank=${entry.value}".yellow())
        }
        append(list.joinToString(", ", "{", "}"))
    }.toString()
}
```

### Notes on implementation

- According to the LRU Algorithm, the lowest rank item will be removed when a new one is inserted and there’s no space left in the cache. Also, every time an item is inserted into the cache it’s rank is set to the highest rank.
- According to the MRU Algorithm, the highest rank item will be removed when a new one is inserted and there’s no space left in the cache. Also, every time an item is inserted into the cache it’s rank is set to the highest rank.

## References

You can get more information on Cache replacement policies on [wikipedia](https://en.wikipedia.org/wiki/Cache_replacement_policies).

