<?php

require_once './data/products.php';
require_once './helpers/ArrayTransformer.php';

const AGGREGATION_PROP_NAMES = [
  'name'   => 'name',
  'aspect'  => 'characteristic',
  'innerGroup'  => 'characteristics',
  'value'  => 'value'
];
const SORTING_FIELD = 'name';
const FILTERS_ARRAY = ['name', 'characteristic'];

$setAggregationGroupCallback = fn($p) => $p['archive'] ? 'archive' : 'notArchive';

$productsArrayTransformer = new Helpers\ArrayTransformer(Data\PRODUCTS);

$productsArrayTransformer->aggregateItemsProperties(
  AGGREGATION_PROP_NAMES,
  $setAggregationGroupCallback,
);
$productsArrayTransformer->sortAggregatedProperties(SORTING_FIELD);
$productsArrayTransformer->transformIntoFiltersArray(FILTERS_ARRAY);

echo '<pre>';
var_dump($productsArrayTransformer->getGroupsArray());
var_dump($productsArrayTransformer->getFiltersArray());
echo '</pre>';
