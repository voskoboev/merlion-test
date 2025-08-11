<?php

namespace Interfaces;

interface ArrayTransformerInterface
{
  public function getGroupsArray(): array;
  public function getFiltersArray(): array;
  public function aggregateItemsProperties(array $propNames, callable $setGroups): void;
  public function sortAggregatedProperties(string $field): void;
  public function transformIntoFiltersArray(array $filters): void;
}
