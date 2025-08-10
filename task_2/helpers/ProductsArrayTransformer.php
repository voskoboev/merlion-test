<?php

namespace Helpers;

require_once './interfaces/ProductsArrayTransformerInterface.php';

use Interfaces\ProductsArrayTransformerInterface;

class ProductsArrayTransformer implements ProductsArrayTransformerInterface
{
  private array $groupsArray = [];
  private array $filtersArray = [];

  public function __construct(private array $array) {}

  public function getGroupsArray(): array
  {
    return $this->groupsArray;
  }

  public function getFiltersArray(): array
  {
    return $this->filtersArray;
  }

  public function transformIntoArchiveStatusGroupsArray(): void
  {
    foreach ($this->array as $product) {
      $group = $product['archive'] ? 'archive' : 'notArchive';
      $name = $product['name'];
      $characteristic = $product['characteristic'];

      $this->groupsArray[$group][$name] ??= [
        'name' => $name,
        'characteristics' => [],
      ];

      $this->groupsArray[$group][$name]['characteristics'][$characteristic] = $product['value'];
    }
  }

  public function sortArchiveStatusGroupsArray(string $field): void
  {
    foreach ($this->groupsArray as $group => $groupProducts) {
      usort($groupProducts, fn($a, $b) => strcmp($a[$field], $b[$field]));
      $this->groupsArray[$group] = $groupProducts;
    }
  }

  public function handleFiltersArray(array $filters): void
  {
    foreach ($this->array as $product) {
      foreach ($filters as $filter) {
        $field = $product[$filter];
        $this->filtersArray[$filter] ??= [];
        $this->filtersArray[$filter][$field] ??= $field;
      }
    }
  }
}
