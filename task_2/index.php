<?php

require_once './data/products.php';
require_once './helpers/ArrayTransformer.php';

const AGGREGATION_FIELD_NAMES = [
  'name'   => 'name',
  'aspect'  => 'characteristic',
  'innerGroup'  => 'characteristics',
  'value'  => 'value'
];
const SORTING_FIELD = 'name';
const FILTERS = ['name', 'characteristic'];

$setAggregationGroupCallback = fn($p) => $p['archive'] ? 'archive' : 'notArchive';

$productsArrayTransformer = new Helpers\ArrayTransformer(Data\PRODUCTS);

$productsArrayTransformer->aggregateItemsFields(
  AGGREGATION_FIELD_NAMES,
  $setAggregationGroupCallback,
);
$productsArrayTransformer->sortAggregatedFields(SORTING_FIELD);
$productsArrayTransformer->transformIntoFiltersArray(FILTERS);

echo '<pre>';
var_dump($productsArrayTransformer->getGroupsArray());
var_dump($productsArrayTransformer->getFiltersArray());
echo '</pre>';
