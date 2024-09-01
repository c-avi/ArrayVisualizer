showArrayVisualizer();


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function showArrayVisualizer() {
    const area = document.getElementById('visualizationArea');
    area.innerHTML = `
        <div class="menu-row1">
            <button style="--color : aqua; --color2 : black" class="menu-btn" onclick="insertIntoArray()">Insertion</button>
            <button style="--color : rgb(255, 115, 0); --color2 : white" class="menu-btn" onclick="deleteFromArray()">Deletion</button>
            <button style="--color : white; --color2 : black" class="menu-btn" onclick="autosort()">Bubble Sort</button>
            <button style="--color : white; --color2 : black" class="menu-btn" onclick="startMergeSort()">Merge Sort</button>
            <button style="--color : white; --color2 : black" class="menu-btn" onclick="startSelectionSort()">Selection Sort</button>
            <button style="--color : white; --color2 : black" class="menu-btn" onclick="startInsertionSort()">Insertion Sort</button>
            <button style="--color : white; --color2 : black" class="menu-btn" onclick="startQuickSort()">Quick Sort</button>
            <button style="--color : white; --color2 : black" class="menu-btn" onclick="startBinarySearch()">Binary Search</button>
            <button style="--color : white; --color2 : black" class="menu-btn" onclick="startLinearSearch()">Linear Search</button>
            <button style="--color : white; --color2 : black" class="menu-btn" onclick="reverseArray()">Reverse Array</button>
        </div>
        <div class="menu-row2">
            <input type="number" id="arrayValue" placeholder="Enter Element">
            <button style="--color : white; --color2 : black" class="menu-btn" onclick="popend()">Clear</button>
        </div>
        <div id="arrayContainer" class="array-container"></div>
    `;

    let array = [4,2,47,38,26,14,10,69];
    let i = 0;
    let j = 0;

    function renderArray() {
        const container = document.getElementById('arrayContainer');
        container.innerHTML = '';
        array.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.textContent = value;
            element.style.height = `${value * 5}px`;
            element.dataset.index = index;
            container.appendChild(element);
        });
    }

    window.popend = function () {
        array.pop();
        renderArray();
    }

    window.insertIntoArray = function () {
        const value = parseInt(document.getElementById('arrayValue').value);
        if (!isNaN(value)) {
            array.push(value);
            resetSortState();
            renderArray();
            // Apply the added class to the new element
            const container = document.getElementById('arrayContainer');
            const newElement = container.children[container.children.length - 1];
            newElement.classList.add('added');

            // Remove the added class after the animation duration
            setTimeout(() => {
                newElement.classList.remove('added');
            }, 500);
        }else{
            alert('Enter a element to insert.');
        }
    };

    window.deleteFromArray = async function () {
        const value = parseInt(document.getElementById('arrayValue').value);
        if (!isNaN(value)) {
            let flag = 0;
            for(let i=0; i<array.length;i++){
                const container = document.getElementById('arrayContainer');
                const element1 = container.children[i];
                element1.style.background = 'green';
                await sleep(500);
                if(array[i] == value){
                    flag++;
                    for(let j = i; j < array.length-1; j++){
                        const element3 = container.children[j];
                        element3.style.background = 'red';
                        const element2 = container.children[j+1];
                        element2.style.background = 'green';
                        await sleep(500);
                        array[j]=array[j+1];
                        resetSortState();
                        renderArray();
                        element1.style.background = '';
                        element2.style.background = '';
                    }
                    break;
                }
                element1.style.background = '';
            }
            if(flag!=0){
                array.pop();
            }else{
                alert('Element to be deleted is not present in the array.');
            }
            resetSortState();
            renderArray();
        }
        else{
            alert('Enter a element to delete');
        }
    };

    window.reverseArray = async function () {
        let start = 0;
        let end = array.length - 1;
        while(start<end){
            const container = document.getElementById('arrayContainer');
            let elements = container.children[start];
            let elemente = container.children[end];
            elements.style.background = 'aqua';
            elemente.style.background = 'greenyellow';
            await sleep(500);
            let temp = array[start];
            array[start] = array[end];
            array[end] = temp;
            resetSortState();
            renderArray();
            elements = container.children[start];
            elemente = container.children[end];
            elements.style.background = 'greenyellow';
            elemente.style.background = 'aqua';
            await sleep(500);
            elements.style.background = '';
            elemente.style.background = '';
            start++;
            end--;
        }
        renderArray();
    };

    window.autosort = async function () {
        while (i < array.length - 1) {
            await performBubbleSortIteration();
        }
    };

    function resetSortState() {
        i = 0;
        j = 0;
    }

    window.performBubbleSortIteration = async function () {
        if (j < array.length - i - 1) {
                const container = document.getElementById('arrayContainer');
                const element1 = container.children[j];
                const element2 = container.children[j + 1];
                element1.style.background = 'linear-gradient(red,orange)';
                element2.style.background = 'linear-gradient(red,orange)';
                await sleep(500);

                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    renderArray();
                }

                element1.style.background = '';
                element2.style.background = '';
                await sleep(500);
                j++;
            } else {
                j = 0;
                i++;
            }
    };

    window.startMergeSort = async function () {
        await mergeSort(array, 0, array.length - 1);
        renderArray();
    };

    async function mergeSort(arr, left, right) {
        if (left >= right) {
            return;
        }

        const middle = Math.floor((left + right) / 2);
        await mergeSort(arr, left, middle);
        await mergeSort(arr, middle + 1, right);
        await merge(arr, left, middle, right);
    }

    async function merge(arr, left, middle, right) {
        const n1 = middle - left + 1;
        const n2 = right - middle;

        let L = new Array(n1);
        let R = new Array(n2);

        for (let i = 0; i < n1; i++) {
            L[i] = arr[left + i];
        }
        for (let j = 0; j < n2; j++) {
            R[j] = arr[middle + 1 + j];
        }

        let i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            const container = document.getElementById('arrayContainer');
            const leftElement = container.children[left + i];
            const rightElement = container.children[middle + 1 + j];

            leftElement.style.background = 'linear-gradient(blue,aqua)';
            rightElement.style.background = 'linear-gradient(green,greenyellow)';
            await sleep(500);

            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }

            renderArray();
            await sleep(500);

            leftElement.style.background = '';
            rightElement.style.background = '';
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
            renderArray();
            await sleep(500);
        }

        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
            renderArray();
            await sleep(500);
        }

        for (let x = left; x <= right; x++) {
            const container = document.getElementById('arrayContainer');
            container.children[x].style.background = 'linear-gradient(pink,yellow)';
        }

        await sleep(500);
    }
    
    window.startQuickSort = async function () {
        await quickSort(array, 0, array.length - 1);
        renderArray();
    };

    async function quickSort(arr, low, high) {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSort(arr, low, pi - 1);
            await quickSort(arr, pi + 1, high);
        }
    }
    
    async function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;
    
        for (let j = low; j < high; j++) {
            const container = document.getElementById('arrayContainer');
            const currentElement = container.children[j];
            const pivotElement = container.children[high];
    
            currentElement.style.background = 'linear-gradient(blue,aqua)';
            pivotElement.style.background = 'linear-gradient(green,greenyellow)';
            await sleep(500);
    
            if (arr[j] <= pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                renderArray();
                await sleep(500);
            }
    
            currentElement.style.background = '';
            pivotElement.style.background = '';
        }
    
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        renderArray();
        await sleep(500);
    
        // Highlight the pivot element at its correct position
        const container = document.getElementById('arrayContainer');
        container.children[i + 1].style.background = 'linear-gradient(pink,yellow)';
        await sleep(500);
    
        return i + 1;
    }

    window.startSelectionSort = async function () {
        await selectionSort(array);
        renderArray();
    };

    async function selectionSort(arr) {
        const container = document.getElementById('arrayContainer');

        for (let i = 0; i < arr.length; i++) {
            let minIdx = i;
            let resetminIndx = minIdx;
            container.children[resetminIndx].style.background = 'linear-gradient(blue,aqua)';

            for (let j = i + 1; j < arr.length; j++) {
                const element2 = container.children[j];
                element2.style.background = 'linear-gradient(green,greenyellow)';
                await sleep(500);

                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
                element2.style.background = '';

                await sleep(500);
            }

            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            }
            renderArray();
            await sleep(500);
        }
    }



    window.startInsertionSort = async function () {
        await insertionSort(array);
        renderArray();
    };

    async function insertionSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;

            const container = document.getElementById('arrayContainer');
            const currentElement = container.children[i];
            currentElement.style.background = 'linear-gradient(blue,aqua)';
            await sleep(500);

            while (j >= 0 && arr[j] > key) {
                const elementToCompare = container.children[j];
                elementToCompare.style.background = 'linear-gradient(green,greenyellow)';
                await sleep(500);

                arr[j + 1] = arr[j];
                renderArray();
                await sleep(500);

                elementToCompare.style.background = '';
                j = j - 1;
            }

            arr[j + 1] = key;
            renderArray();
            await sleep(500);

            for (let k = 0; k <= i; k++) {
                container.children[k].style.background = 'linear-gradient(pink,yellow)';
            }

            currentElement.style.background = '';
        }
    }


    window.startBinarySearch =async function () {
        const searchValue = parseInt(document.getElementById('arrayValue').value);
        if (!isNaN(searchValue)) {
            resetSearchVisuals();
            array.sort((a,b)=>a-b);
            renderArray();
            await sleep(500);
            binarySearch(array, searchValue);
        } else {
            alert("Please enter a valid search value.");
        }
    };

    function resetSearchVisuals() {
        const container = document.getElementById('arrayContainer');
        for (let x = 0; x < array.length; x++) {
            container.children[x].style.background = '';
        }
    }

    async function binarySearch(arr, searchValue) {
        let low = 0;
        let high = arr.length - 1;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            const container = document.getElementById('arrayContainer');
            const midElement = container.children[mid];
            midElement.style.background = 'linear-gradient(green,greenyellow)';
            await sleep(500);

            if (arr[mid] === searchValue) {
                midElement.style.background = 'linear-gradient(pink,yellow)';
                alert(`Element ${searchValue} found at index ${mid}.`);
                return;
            } else if (arr[mid] < searchValue) {
                for (let x = low; x <= mid; x++) {
                    const container = document.getElementById('arrayContainer');
                    container.children[x].style.background = 'linear-gradient(red,orange)';
                }
                await sleep(500);

                low = mid + 1;
            } else {
                for (let x = mid; x <= high; x++) {
                    const container = document.getElementById('arrayContainer');
                    container.children[x].style.background = 'linear-gradient(red,orange)';
                }
                await sleep(500);

                high = mid - 1;
            }

            for (let x = low; x <= high; x++) {
                const container = document.getElementById('arrayContainer');
                container.children[x].style.background = 'linear-gradient(green,greenyellow)';
            }

            await sleep(500);
        }

        alert(`Element ${searchValue} not found.`);
    }

    window.startLinearSearch = function () {
        const searchValue = parseInt(document.getElementById('arrayValue').value);
        if (!isNaN(searchValue)) {
            resetSearchVisuals();
            linearSearch(array, searchValue);
        } else {
            alert("Please enter a valid search value.");
        }
    };

    async function linearSearch(arr, searchValue) {
        let found = false;
        for (let i = 0; i < arr.length; i++) {
            const container = document.getElementById('arrayContainer');
            const currentElement = container.children[i];
            currentElement.style.background = 'linear-gradient(blue,aqua)';
            await sleep(500);

            if (arr[i] === searchValue) {
                currentElement.style.background = 'linear-gradient(pink,yellow)';
                alert(`Element ${searchValue} found at index ${i}.`);
                found = true;
                break;
            }

            currentElement.style.background = '';
            await sleep(500);
        }

        if (!found) {
            alert(`Element ${searchValue} not found.`);
        }
    }

    renderArray();
}