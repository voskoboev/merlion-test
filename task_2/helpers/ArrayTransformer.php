<?php

namespace Helpers;

require_once './interfaces/ArrayTransformerInterface.php';

use Interfaces\ArrayTransformerInterface;

class ArrayTransformer implements ArrayTransformerInterface
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

  public function aggregateItemsProperties(array $propNames, callable $setGroups): void
  {
    foreach ($this->array as $item) {
      $group = $setGroups($item);
      $nameProp = $propNames['name'];
      $aspectProp = $propNames['aspect'];
      $innerGroupProp = $propNames['innerGroup'];
      $valueProp = $propNames['value'];
      $name = $item[$nameProp];
      $aspect = $item[$aspectProp];

      $this->groupsArray[$group][$name] ??= [
        "$nameProp" => $name,
        $innerGroupProp => [],
      ];

      $this->groupsArray[$group][$name][$innerGroupProp][$aspect] = $item[$valueProp];
    }
  }

  public function sortAggregatedProperties(string $field): void
  {
    foreach ($this->groupsArray as $group => $groupItems) {
      usort($groupItems, fn($a, $b) => strcmp($a[$field], $b[$field]));
      $this->groupsArray[$group] = $groupItems;
    }
  }

  public function transformIntoFiltersArray(array $filters): void
  {
    foreach ($this->array as $item) {
      foreach ($filters as $filter) {
        $field = $item[$filter];
        $this->filtersArray[$filter] ??= [];
        $this->filtersArray[$filter][$field] ??= $field;
      }
    }
  }
}
