export default class BrandGame {
  constructor(dayDuration = 3000) {
    this.log = [];
    this.dayDuration = dayDuration;
    this.freightCost = 0;
    this.manufacturingDays = 21;
    this.pendingOrdersList = [];
    this.gameLost = false;
    this.wholesaleCostPerUnit = 60;
    this.storageFeePerUnit = 1.5;
    this.storageFeeMin = 150;
    this.fulfillmentCostPerUnit = 8;
    this.freightCostPerUnit = 5;
    this.freightMinimum = 2000;
    this.msrp = 100;
    this.dailyStats = [this.initialStats];

    // set the attributes on the intial stats as attributes on the class instance
    for (const key in this.initialStats) {
      this[key] = this.initialStats[key]
    }

    this.initialBalance = this.balance;
  }

  get initialStats() {
      return {
        day: 0,
        balance: 10000,
        inventory: 50,
        customerLoyalty: 0.85,
        unitsSold: 0,
        storageFee: 0,
        fulfillmentCost: 0,
        inventoryCost: 0,
        revenue: 0,
        cogs: 0,
        grossMargin: 0.5,
        cumulativeCogs: 0,
        cumulativeRevenue: 0,
        cumulativeGrossMargin: 0,
        cumulativeStorageFee: 0,
        cumulativeFreightCost: 0,
        cumulativeFulfillmentCost: 0,
        cumulativeInventoryCost: 0,
        pendingOrders: 0
      }
  }

  startGame(lowLevelThreshold = 2, orderQuantity = 50, retailCostPerUnit = 100) {
    this.lowLevelThreshold = lowLevelThreshold;
    this.orderQuantity = orderQuantity;
    this.retailCostPerUnit = retailCostPerUnit;
    this.gameLoop = setInterval(() => {
      if (this.gameLost && !this.isGameWon()) {
        this.log.push(`Game Over! You ran out of cash after ${this.day} days.`);
        // this.log.push(this.getPlayerSettings())
        clearInterval(this.gameLoop);
        return;
      }

      if (this.isGameWon()) {
        this.log.push(`Nice! You doubled your balance in ${this.day} days.`);
        // this.log.push(this.getPlayerSettings())
        clearInterval(this.gameLoop);
        return;
      }

      this.processDay();
    }, this.dayDuration);
  }

  isGameRunning() {
    return this.gameLoop;
  }

  toggleGame(lowLevelThreshold, orderQuantity, retailCostPerUnit) {
    if (this.gameLoop) {
      this.pauseGame();
    } else {
      this.startGame(lowLevelThreshold, orderQuantity, retailCostPerUnit);
    }
  }

  pauseGame() {
    clearInterval(this.gameLoop);
    this.gameLoop = null;
  }

  getPlayerSettings() {
    return {
      lowLevelThreshold: this.lowLevelThreshold,
      orderQuantity: this.orderQuantity,
      retailCostPerUnit: this.retailCostPerUnit
    }
  }

  processDay() {
    this.day++;
    
    // Customer purchase attempt
    this.unitsSold = this.customerPurchaseAttempt();
    this.revenue = this.unitsSold * this.retailCostPerUnit;

    // Check inventory and order if necessary
    if (this.inventory <= this.lowLevelThreshold) {
      this.orderInventory();
    }
    
    // Process pending orders
    this.processPendingOrders();
    
    // Update daily stats
    this.updateDailyStats();
    

    // Check if game over
    if (this.balance <= 0) {
      this.gameLost = true;
    }
  }

  customerPurchaseAttempt() {
    const unitsDemanded = this.calculateUnitsDemanded(this.customerLoyalty, this.retailCostPerUnit, this.msrp);
    if (unitsDemanded <= this.inventory) {
      this.inventory -= unitsDemanded;
      this.revenue = unitsDemanded * this.retailCostPerUnit;
      this.balance += this.revenue;
      this.incrementCustomerLoyalty();
      this.shipToCustomer(unitsDemanded);
      return unitsDemanded;
    } else {
      this.log.push('Customer left due to lack of inventory');
      this.decrementCustomerLoyalty();
      return 0;
    }
  }

  incrementCustomerLoyalty() {
   let number = Math.min(this.customerLoyalty + 0.05, 1);
    this.customerLoyalty = parseFloat(number.toFixed(2))
  }

  // you lose loyalty twice as fast as you gain it
  decrementCustomerLoyalty() {
    let number = Math.max(this.customerLoyalty - 0.10, 0);
    this.customerLoyalty = parseFloat(number.toFixed(2))
  }

  calculateUnitsDemanded(customerLoyalty, retailCostPerUnit, msrp) {
    const maxDemand = Math.floor(Math.random() * 10 * customerLoyalty) + 1;


   // Calculate the percentage difference between MSRP and retail price
    const priceDifference = Math.abs(retailCostPerUnit - msrp) / msrp;

    // Calculate demand using an exponential decay function
    const elasticity = 0.5
    let demand = maxDemand * Math.exp(-elasticity * priceDifference);

    if (priceDifference > 0.5 && retailCostPerUnit > msrp) {
      this.log.push('Price is too high, demand is low')
      this.decrementCustomerLoyalty();
    }

    if (priceDifference > 0.5 && retailCostPerUnit < msrp) {
      demand *= 10; // 10x demand for their too-good to be true to escale quickly
      this.incrementCustomerLoyalty();
    }

    // Ensure demand is between 0 and maxDemand
    let out = Math.max(0, Math.min(maxDemand, demand));
    return Math.floor(out);
  }

  calculateStorageFee() {
    const perUnit = this.inventory * this.storageFeePerUnit;
    return Math.max(perUnit, this.storageFeeMin);
  }

  orderInventory() {
    if (this.pendingOrdersList.length > 0) {
      // this.log.push('Already have pending orders, skipping inventory order...')
      return;
    }
    this.log.push("Ordering inventory...");
    this.pendingOrdersList.push({
      quantity: this.orderQuantity,
      daysLeft: this.manufacturingDays
    });
  }

  processPendingOrders() {
    for (let i = this.pendingOrdersList.length - 1; i >= 0; i--) {
      this.pendingOrdersList[i].daysLeft--;
      if (this.pendingOrdersList[i].daysLeft === 0) {
        this.receiveShipment(this.pendingOrdersList[i].quantity);
        this.pendingOrdersList.splice(i, 1);
      }
    }
  }

  receiveShipment(quantity) {
    this.log.push("Receiving shipment...");
    this.inventoryCost += quantity * this.wholesaleCostPerUnit;
    this.inventory += quantity;
    this.freightCost = Math.min(quantity * this.freightCostPerUnit, this.freightMinimum);
    this.cogs += this.freightCost
  }

  shipToCustomer(quantity) {
    const fulfillmentCost = quantity * this.fulfillmentCostPerUnit;
    this.fulfillmentCost += fulfillmentCost;
    this.cogs += this.fulfillmentCost
    this.cogs += quantity * this.wholesaleCostPerUnit;
  }

  updateDailyStats() {
    this.storageFee = this.calculateStorageFee();

    this.cogs += this.storageFee
    this.balance -= this.cogs;

    const gm = Number(((this.revenue - this.cogs) / this.revenue).toFixed(2))
    this.grossMargin = Math.max(gm, 0);
    this.cumulativeCogs += this.cogs
    this.cumulativeRevenue += this.revenue
    this.cumulativeStorageFee += this.storageFee
    this.cumulativeFreightCost += this.freightCost
    this.cumulativeFulfillmentCost += this.fulfillmentCost
    const cgm = Number(((this.cumulativeRevenue - this.cumulativeCogs) / this.cumulativeRevenue).toFixed(2))
    this.cumulativeGrossMargin = Math.max(cgm, 0);
    this.cumulativeInventoryCost += this.inventoryCost

      let dailyStats = {}
      for (const key in this.initialStats) {
        dailyStats[key] = this[key]
      }
      this.dailyStats.push(dailyStats);

      // keep a max of 50 days
      if (this.dailyStats.length >= 10) {
        this.dailyStats.shift();
      }

      this.cogs = 0; // reset cogs for next day
      this.freightCost = 0; // reset freight cost for next day
      this.fulfillmentCost = 0; // reset fulfillment cost for next day
      this.storageFee = 0; // reset storage fee for next day
      this.inventoryCost = 0; // reset inventory cost for next day
  }

  setDayDuration(duration) {
    this.dayDuration = duration;
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.startGame();
    }
  }

  getDailyStats() {
    return this.dailyStats;
  }

  getTodayStats() {
    return this.dailyStats[this.dailyStats.length - 1];
  }

  isGameLost() {
    return this.gameLost;
  }

  isGameWon() {
    return this.balance > this.initialBalance * 2;
  }
}



