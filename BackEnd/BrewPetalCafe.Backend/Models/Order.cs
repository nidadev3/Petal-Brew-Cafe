using System;
using System.Collections.Generic;

namespace BrewPetalCafe.Backend.Models;

public partial class Order
{
    public int Id { get; set; }

    public string UserId { get; set; } = null!;

    public DateTime OrderDate { get; set; }

    public string Status { get; set; } = null!;

    public decimal TotalAmount { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual AspNetUser User { get; set; } = null!;
}
