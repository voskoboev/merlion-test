<?php
require_once './data/products.php';
require_once './helpers/ProductsArrayTransformer.php';

// С помощью PHP нужно обработать этот массив так, чтобы на выходе получить два массива,
// которые будут переданы потом в JS в качестве JSON.

// Первый должен содержать перечень товаров, распределенных по группам "archive", "notArchive", 
// в первую попадают товары, у которых archive = false в другую остальные, в группе товары должны быть отсортированы по имени в алфавитном порядке. 

// В каждом товаре должно быть name (поле name) и characteristics, в котором содержится массив характеристик товара, 
// где ключ имя характеристики (поле characteristic), а значением является значение характеристики (поле value).

// Второй же массив должен представлять из себя массив характеристик сделанный таким образом, 
// чтобы его было удобно использовать для формирования и использования фильтров в каталоге. 

// Решение, как будет выглядить этот массив, принимает разработчик.

const SORTING_FIELD = 'name';
const FILTERS_ARRAY = ['name', 'characteristic'];

$productsArrayTransformer = new Helpers\ProductsArrayTransformer(Data\PRODUCTS);

$productsArrayTransformer->transformIntoArchiveStatusGroupsArray();
$productsArrayTransformer->sortArchiveStatusGroupsArray(SORTING_FIELD);
$productsArrayTransformer->handleFiltersArray(FILTERS_ARRAY);

echo '<pre>';
// var_dump($productsArrayTransformer->getGroupsArray());
var_dump($productsArrayTransformer->getFiltersArray());
echo '</pre>';
